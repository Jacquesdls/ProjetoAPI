const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'E-mail é obrigatório'], 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'E-mail inválido'], // Regex para e-mail válido
  },
  password: { 
    type: String, 
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres'], // Restrições de tamanho
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10); // Certifica que este hash ocorre
  next();
});


module.exports = mongoose.model('User', userSchema);
