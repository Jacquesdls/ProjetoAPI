const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // Carregar variáveis de ambiente
const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Validação da configuração
if (!process.env.MONGO_URI) {
  console.error('Erro: MONGO_URI não definido no arquivo .env');
  process.exit(1);
}

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Encerrar se a conexão falhar
  });

// Rotas
app.use('/api/auth', authRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API está funcionando' });
});

// Exemplo de rota de usuários
app.get('/users', (req, res) => {
  res.json({ success: true, message: 'Usuários listados:', data: [] });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
