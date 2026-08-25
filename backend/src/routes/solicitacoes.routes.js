const express = require('express');
const router = express.Router();
const solicitacoesController = require('../controllers/solicitacoes.controller');

// RF03 — abrir nova solicitação
router.post('/', solicitacoesController.criar);

// RF06 — acompanhamento de status
router.get('/:id', solicitacoesController.buscarPorId);

// RF07 — histórico com filtros
router.get('/', solicitacoesController.listar);

// RF11 — atualização de status (uso administrativo)
router.patch('/:id/status', solicitacoesController.atualizarStatus);

// RF09 — confirmação de conclusão
router.patch('/:id/confirmar-conclusao', solicitacoesController.confirmarConclusao);

module.exports = router;
