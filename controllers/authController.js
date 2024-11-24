const bcrypt = require('bcrypt'); // Certifique-se de instalar essa biblioteca
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'E-mail ou Senha Inválida' });

    // Verifica se a senha fornecida corresponde ao hash armazenado no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'E-mail ou Senha Inválida' });

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
    const users = await User.find(); // Obtém todos os usuários do banco de dados
    res.status(200).json({
      success: true,
      message: 'Usuários listados:',
      data: users, // Retorna a lista de usuários
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Verifica se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Exclui o usuário
    await user.remove();

    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

