const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/gruposAtendimento.controller');

// RF13 — listar grupos formados por agrupamento geográfico (raio 500m)
router.get('/', gruposController.listar);

// RF14 — rota otimizada sugerida para um grupo
router.get('/:id/rota', gruposController.rotaSugerida);

module.exports = router;
