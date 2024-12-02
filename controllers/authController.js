const bcrypt = require('bcrypt'); // Certifique-se de instalar essa biblioteca
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login de usuário
exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log(req.body);

      // Encontrar o usuário pelo email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      // Comparar a senha fornecida com a criptografada no banco de dados
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Senha incorreta' });
      }

      // Gerar o token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
          message: 'Login bem-sucedido!',
          token,  // Retornar o token JWT
      });
  } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

// Registro de novo usuário
exports.register = async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o novo usuário
      const newUser = new User({
          username,
          email,
          password: hashedPassword // Armazenar senha criptografada
      });

      await newUser.save();

      res.status(201).json({
          message: 'Usuário registrado com sucesso!',
          user: {
              username: newUser.username,
              email: newUser.email,
          },
      });
  } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

// Rota para listar os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclui senhas na resposta
    if (!users.length) {
      return res.status(404).json({ success: false, message: 'Nenhum usuário encontrado' });
    }

    res.status(200).json({
      success: true,
      message: `${users.length} usuário(s) encontrado(s)`,
      data: users, // Lista de usuários
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuários',
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params; // Pegando o ID do usuário da URL
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário deletado com sucesso',
      data: user, // Detalhes do usuário excluído
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar usuário',
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params; // Pega o ID do usuário da URL
  const { email, password } = req.body; // Pega os dados enviados no corpo da requisição

  try {
    // Validação de entrada
    if (!email && !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nada para atualizar. Envie pelo menos um campo (email ou password).' 
      });
    }

    // Prepara os campos a serem atualizados
    const updateFields = {};
    if (email) updateFields.email = email;
    if (password) updateFields.password = await bcrypt.hash(password, 10); // Hasheia a senha, caso fornecida

    // Atualiza o usuário
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { 
      new: true, // Retorna o documento atualizado
      runValidators: true, // Garante que as validações do schema sejam aplicadas
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: updatedUser, // Retorna os detalhes atualizados do usuário
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar usuário',
      error: err.message,
    });
  }
};

