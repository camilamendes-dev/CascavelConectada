require('dotenv').config();
const express = require('express');
const cors = require('cors');

const solicitacoesRoutes = require('./routes/solicitacoes.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const gruposAtendimentoRoutes = require('./routes/gruposAtendimento.routes');

const app = express();

app.use(cors());
app.use(express.json());

// RF01, RF02 — cadastro e login
app.use('/api/usuarios', usuariosRoutes);

// RF03-RF09 — solicitações do cidadão
app.use('/api/solicitacoes', solicitacoesRoutes);

// RF10-RF14 — painel administrativo e agrupamento geográfico
app.use('/api/grupos-atendimento', gruposAtendimentoRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', servico: 'CascavelConectada API' });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
