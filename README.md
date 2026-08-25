<div align="center">

# 🏙️ CascavelConectada

**Plataforma digital (app mobile + portal web) para solicitação e gestão inteligente de serviços urbanos municipais em Cascavel–PR.**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Extensão](https://img.shields.io/badge/UNIPAR-Extensão%20IV-green)
![License](https://img.shields.io/badge/license-MIT-blue)

![React Native](https://img.shields.io/badge/React%20Native-20232A?logo=react&logoColor=61DAFB)
![React](https://img.shields.io/badge/React.js-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL%20%2B%20PostGIS-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

</div>

---

Muitos moradores ainda precisam ir presencialmente até órgãos públicos — ou ligar para números que nunca atendem — só para reportar um buraco na rua, uma lâmpada queimada ou solicitar poda de árvore. O **CascavelConectada** resolve isso digitalizando o registro de solicitações com geolocalização e fotos, além de agrupar demandas próximas (raio de 500m) e sugerir rotas otimizadas para as equipes de campo, reduzindo deslocamentos e aumentando a eficiência do atendimento.

## 📑 Sumário

- [Como Instalar](#-como-instalar)
- [Como Usar](#-como-usar)
- [Tecnologias](#️-tecnologias)
- [Requisitos](#-requisitos)
- [Modelagem do Sistema](#-modelagem-do-sistema)
- [Protótipos de Tela](#-protótipos-de-tela)
- [Roadmap](#️-roadmap)
- [Autoria](#-autoria)
- [Licença](#-licença)

---

## 📦 Como Instalar

Siga os passos abaixo para rodar o projeto localmente:

1. Clone este repositório:
   ```bash
   git clone https://github.com/camilamendes-dev/CascavelConectada.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd CascavelConectada
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

| Camada | Tecnologia |
|---|---|
| App do cidadão | React Native |
| Portal web | React.js |
| Backend | Node.js + Express |
| Banco de dados | PostgreSQL + PostGIS (geolocalização) |
| Autenticação | JWT + bcrypt |
| Armazenamento de imagens | AWS S3 |
| Notificações | Firebase Cloud Messaging |
| Infraestrutura | Docker + Docker Compose |

---

## 📋 Requisitos

Levantamento com **17 requisitos funcionais** (RF01–RF17, módulos Cidadão e Administrativo) e **9 requisitos não funcionais** (RNF01–RNF09: desempenho, disponibilidade, segurança, usabilidade, escalabilidade, compatibilidade, manutenibilidade, privacidade/LGPD e portabilidade).

Atores do sistema: **Cidadão**, **Administrador**, **Equipe de Manutenção** e **Sistema Automático**.

📄 Lista completa e detalhada: [`docs/REQUISITOS.md`](docs/REQUISITOS.md)

---

## 🧩 Modelagem do Sistema

### Diagrama de Classes (UML)

7 entidades principais — `Usuario`, `Solicitacao`, `Categoria`, `Imagem`, `GrupoAtendimento`, `OrdemServico` e `Notificacao` — cobrindo relacionamentos 1:N, 1:1 e N:1.

![Diagrama de Classes UML](docs/imagens/diagrama-classes-uml.png)

### Diagrama Entidade-Relacionamento (DER)

Estrutura física do banco PostgreSQL, com UUID como chave primária em todas as tabelas e campos de geolocalização (`DECIMAL(10,7)`).

![DER - Banco de Dados](docs/imagens/der-banco-dados.png)

---

## 📱 Protótipos de Tela

7 telas cobrindo os dois ambientes da plataforma: Login, mapa inicial, nova solicitação e histórico (app mobile); dashboard, gestão de solicitações e visualização de rotas (portal web).

![Protótipos de Tela](docs/imagens/prototipos-telas.png)

---

## 🗺️ Roadmap

- [x] **Extensão III** — Levantamento de requisitos, modelagem UML/DER e protótipos de tela
- [ ] **Extensão IV** — Implementação do MVP (backend + autenticação + registro de solicitações)
- [ ] Módulo de agrupamento geográfico e otimização de rotas
- [ ] Painel administrativo com KPIs e relatórios
- [ ] Testes e validação com usuários piloto

---

## 👥 Autoria

Projeto desenvolvido por **Camila Mendes** e **Gabriel Santos Inácio**, no âmbito da Extensão III do curso de Engenharia de Software — UNIPAR Cascavel, 2026.

## 📄 Licença

Este projeto está sob a licença MIT — sinta-se livre para estudar, adaptar e contribuir.

---

<div align="center">

Feito com 💚 para tornar a gestão urbana mais próxima do cidadão.

</div>
