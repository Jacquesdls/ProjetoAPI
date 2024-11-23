const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/auth', authRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API está funcionando');
});

app.get('/users', (req, res) => {
    res.json({ message: 'Usuários listados:' });
  });
  

