const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config(); // Carregar variáveis de ambiente
const app = express();
const port = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors(corsOptions));

const corsOptions = {
  origin: 'http://localhost:3000', // Altere para o domínio do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


// Outras configurações do Express
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
app.use('/api/auth', require('./routes/authRoutes'));

// Rota inicial
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API está funcionando' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//Verificação da saúde do Serviço - Render
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

