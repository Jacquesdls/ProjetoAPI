const bcrypt = require('bcrypt'); // Certifique-se de instalar essa biblioteca
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'E-mail Inválido' });

    // Verifica se a senha fornecida corresponde ao hash armazenado no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha Inválida' });

    // Gera um token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ 
      token, 
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    // Hash da senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10); // O número 10 é o "salt rounds"
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

