const pool = require('../config/database');

// RF13 — agrupamento geográfico de solicitações (raio de até 500m)
// TODO: usar ST_DWithin do PostGIS para clusterizar por proximidade real
exports.listar = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? 'WHERE status = $1' : '';
    const valores = status ? [status] : [];

    const result = await pool.query(
      `SELECT * FROM grupos_atendimento ${where} ORDER BY criado_em DESC`,
      valores
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar grupos de atendimento', detalhe: err.message });
  }
};

// RF14 — sugestão de rota otimizada
// TODO: integrar serviço de otimização de rotas (ex.: OSRM / Google Directions API)
exports.rotaSugerida = async (req, res) => {
  try {
    const { id } = req.params;

    res.json({
      grupo_id: id,
      rota_otimizada: true,
      mensagem: 'Placeholder — integrar motor de roteirização (Extensão IV)',
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao gerar rota', detalhe: err.message });
  }
};
