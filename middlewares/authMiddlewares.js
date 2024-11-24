const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Obter o token do cabeçalho da requisição (Authorization: Bearer token)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verificar a validade do token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica se o token é válido
    req.user = decoded; // Atribui o usuário decodificado à requisição
    next(); // Passa para o próximo middleware ou a rota
  } catch (err) {
    res.status(403).json({ message: 'Token inválido.' });
  }
};

module.exports = authenticateToken;
