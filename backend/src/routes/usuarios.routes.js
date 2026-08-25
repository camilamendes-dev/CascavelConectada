const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// RF01 — cadastro de usuário
router.post('/cadastro', usuariosController.cadastrar);

// RF02 — login
router.post('/login', usuariosController.login);

module.exports = router;
