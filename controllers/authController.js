const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'E-mail ou Senha Inválida' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'E-mail ou Senha Inválida' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
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

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

