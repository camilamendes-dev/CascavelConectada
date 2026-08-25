const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// RF01 — cadastro (nome, CPF, e-mail, senha)
exports.cadastrar = async (req, res) => {
  try {
    const { nome, cpf, email, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (nome, cpf, email, senha_hash, tipo, ativo, criado_em)
       VALUES ($1, $2, $3, $4, 'CIDADAO', true, NOW())
       RETURNING id, nome, email, tipo`,
      [nome, cpf, email, senhaHash]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: err.message });
  }
};

// RF02 — login com e-mail/senha
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const usuario = result.rows[0];

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET || 'segredo-dev',
      { expiresIn: '7d' }
    );

    res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao autenticar', detalhe: err.message });
  }
};
