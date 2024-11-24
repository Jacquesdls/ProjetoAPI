const express = require('express');
const { register, login, getUsers, deleteUser } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddlewares'); // Importa o middleware
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Rota para listar usuários com autenticação
router.get('/users', authenticateToken, getUsers);

router.delete('/users/:id', authenticateToken, deleteUser);

module.exports = router;


