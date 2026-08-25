# 🏙️ CascavelConectada

Plataforma digital (app mobile + portal web) para solicitação e gestão inteligente de serviços urbanos municipais em Cascavel–PR.

Muitos munícipes ainda precisam ir presencialmente até órgãos públicos — ou ligar para números que nunca atendem — só para reportar um buraco na rua, uma lâmpada queimada ou solicitar poda de árvore. O **CascavelConectada** resolve isso digitalizando o registro de solicitações com geolocalização e fotos, além de agrupar demandas próximas (raio de 500m) e sugerir rotas otimizadas para as equipes de campo, reduzindo deslocamentos e aumentando a eficiência do atendimento.

---

## 📦 Como Instalar

Siga os passos abaixo para rodar o projeto localmente:

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/cascavelconectada.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd cascavelconectada
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
5. Suba o banco de dados local (via Docker):
   ```bash
   docker-compose up -d
   ```
6. Inicie a aplicação:
   ```bash
   npm run dev
   ```

---

## 🚀 Como Usar

### Abrindo uma solicitação (app do cidadão)

```bash
POST /api/solicitacoes
{
  "tipo": "buraco_via",
  "endereco": "Rua das Palmeiras, 123",
  "descricao": "Buraco grande próximo ao cruzamento",
  "foto": "buraco.jpg"
}
```

**Resposta esperada:**
```json
{
  "protocolo": "2026-0842",
  "status": "recebido",
  "prazo_estimado": "5 dias úteis"
}
```

### Acompanhando o status

```bash
GET /api/solicitacoes/2026-0842
```

```json
{
  "protocolo": "2026-0842",
  "status": "em_andamento",
  "orgao_responsavel": "Secretaria de Obras",
  "ultima_atualizacao": "2026-08-24"
}
```

### Agrupamento geográfico e rotas (portal web)

O sistema agrupa automaticamente solicitações em um raio de 500m e sugere a rota otimizada para a equipe de campo:

```bash
GET /api/grupos-atendimento?status=aberto
```

```json
{
  "grupo": "Centro-01",
  "solicitacoes": 5,
  "equipe_sugerida": "Equipe 1",
  "rota_otimizada": true
}
```

### Painel da gestão municipal

Acesse `http://localhost:3000/painel` para visualizar todos os chamados por bairro, categoria e status, com KPIs (abertas, em andamento, concluídas, tempo médio) e mapa interativo.

---

## 🛠️ Tecnologias

- **Frontend (app cidadão):** React Native
- **Frontend (portal web):** React.js
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL + PostGIS (geolocalização)
- **Autenticação:** JWT + bcrypt
- **Armazenamento de imagens:** AWS S3
- **Notificações:** Firebase Cloud Messaging
- **Infraestrutura:** Docker + Docker Compose

---

## 📋 Requisitos

Levantamento com **17 requisitos funcionais** (RF01–RF17, módulos Cidadão e Administrativo) e **9 requisitos não funcionais** (RNF01–RNF09: desempenho, disponibilidade, segurança, usabilidade, escalabilidade, compatibilidade, manutenibilidade, privacidade/LGPD e portabilidade).

Atores do sistema: Cidadão, Administrador, Equipe de Manutenção e Sistema Automático.

📄 Lista completa e detalhada: [docs/REQUISITOS.md](docs/REQUISITOS.md)

---

## 📌 Status do Projeto

🚧 Em desenvolvimento — documentação completa (requisitos, diagrama de classes UML com 7 entidades, DER e protótipos de 7 telas) já concluída como parte da Extensão III (UNIPAR Cascavel). Agora, na **Extensão IV**, o projeto avança para a produção de fato: implementação do MVP a partir da documentação e dos artefatos já validados.

## 👥 Autoria

Projeto desenvolvido por Camila Mendes e Gabriel Santos Inácio, no âmbito da Extensão III do curso de Engenharia de Software (ADS) — UNIPAR Cascavel, 2026.

---

Feito com 💚 para tornar a gestão urbana mais próxima do cidadão.
