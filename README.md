# 🏙️ CascavelConectada

Plataforma digital para solicitação de serviços urbanos, conectando cidadãos e prefeitura de forma rápida, transparente e sem burocracia.

Muitos munícipes ainda precisam ir presencialmente até órgãos públicos — ou ligar para números que nunca atendem — só para reportar um buraco na rua, uma lâmpada queimada ou solicitar poda de árvore. O **CascavelConectada** resolve isso com um app para o cidadão e um portal web para a gestão municipal acompanharem cada chamado do início ao fim.

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

### Painel da gestão municipal

Acesse `http://localhost:3000/painel` para visualizar todos os chamados por bairro, tipo de serviço e status, com filtros e mapa interativo.

---

## 🛠️ Tecnologias

- **Frontend (app cidadão):** React Native
- **Frontend (portal web):** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL
- **Autenticação:** JWT
- **Mapas:** Leaflet / OpenStreetMap
- **Infraestrutura local:** Docker

---

## 📌 Status do Projeto

🚧 Em desenvolvimento — próxima etapa: integração do mapa de chamados no painel da gestão.

---

Feito com 💚 para tornar a gestão urbana mais próxima do cidadão.
