const pool = require('../config/database');

// RF03, RF04, RF05 — registro de solicitação com foto e geolocalização
exports.criar = async (req, res) => {
  try {
    const { usuario_id, categoria_id, titulo, descricao, latitude, longitude, endereco } = req.body;

    const result = await pool.query(
      `INSERT INTO solicitacoes (usuario_id, categoria_id, titulo, descricao, status, latitude, longitude, endereco, criada_em)
       VALUES ($1, $2, $3, $4, 'aberta', $5, $6, $7, NOW())
       RETURNING *`,
      [usuario_id, categoria_id, titulo, descricao, latitude, longitude, endereco]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar solicitação', detalhe: err.message });
  }
};

// RF06 — status de uma solicitação
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM solicitacoes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Solicitação não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar solicitação', detalhe: err.message });
  }
};

// RF07, RF10 — histórico / painel com filtros (status, categoria, região, data)
exports.listar = async (req, res) => {
  try {
    const { status, categoria_id, usuario_id } = req.query;
    const condicoes = [];
    const valores = [];

    if (status) {
      valores.push(status);
      condicoes.push(`status = $${valores.length}`);
    }
    if (categoria_id) {
      valores.push(categoria_id);
      condicoes.push(`categoria_id = $${valores.length}`);
    }
    if (usuario_id) {
      valores.push(usuario_id);
      condicoes.push(`usuario_id = $${valores.length}`);
    }

    const where = condicoes.length ? `WHERE ${condicoes.join(' AND ')}` : '';
    const result = await pool.query(
      `SELECT * FROM solicitacoes ${where} ORDER BY criada_em DESC`,
      valores
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar solicitações', detalhe: err.message });
  }
};

// RF11 — atualização de status pelo administrador
exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, observacoes } = req.body;

    const result = await pool.query(
      `UPDATE solicitacoes SET status = $1, atualizada_em = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar status', detalhe: err.message });
  }
};

// RF09 — confirmação/contestação de conclusão pelo cidadão
exports.confirmarConclusao = async (req, res) => {
  try {
    const { id } = req.params;
    const { confirmado } = req.body;

    const novoStatus = confirmado ? 'concluida' : 'em_andamento';

    const result = await pool.query(
      `UPDATE solicitacoes SET status = $1, atualizada_em = NOW() WHERE id = $2 RETURNING *`,
      [novoStatus, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao confirmar conclusão', detalhe: err.message });
  }
};
