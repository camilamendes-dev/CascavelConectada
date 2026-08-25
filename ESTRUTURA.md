# Estrutura Inicial — CascavelConectada (Extensão IV)

Base de código organizada a partir da documentação da Extensão III (requisitos RF01–RF17, diagrama de classes e DER).

```
CascavelConectada/
├── backend/          → API REST (Node.js + Express + PostgreSQL/PostGIS)
│   ├── src/
│   │   ├── config/       → conexão com o banco
│   │   ├── controllers/  → lógica de cada requisito (RF)
│   │   ├── routes/       → endpoints da API
│   │   └── server.js     → ponto de entrada
│   ├── migrations/
│   │   └── 001_init.sql  → cria as 7 tabelas do DER
│   └── .env.example
├── web/               → Portal administrativo (React.js + Vite)
│   └── src/
│       ├── pages/        → Dashboard, Gestão de Solicitações, Rotas
│       └── services/      → chamadas à API
├── mobile/             → App do cidadão (React Native + Expo)
│   └── src/
│       ├── screens/       → Login, Mapa, Nova Solicitação, Histórico
│       └── services/      → chamadas à API
└── docker-compose.yml  → sobe o PostgreSQL/PostGIS localmente
```

## Como rodar o backend

```bash
cd backend
cp .env.example .env
npm install
docker-compose -f ../docker-compose.yml up -d   # sobe o banco
npm run dev
```

## Como rodar o portal web

```bash
cd web
npm install
npm run dev
```

## Como rodar o app mobile

```bash
cd mobile
npm install
npx expo start
```

## O que já está esqueletado

- ✅ Rotas e controllers para RF01–RF14 (cadastro, login, solicitações, status, agrupamento geográfico)
- ✅ Migração SQL com as 7 tabelas do DER (`usuarios`, `categorias`, `solicitacoes`, `imagens`, `grupos_atendimento`, `ordens_servico`, `notificacoes`)
- ✅ Autenticação com JWT + bcrypt (RNF03)
- ✅ Tela de Login (mobile) e Dashboard (web) como ponto de partida

## O que falta implementar (próximos passos da Extensão IV)

- [ ] Upload de imagens para AWS S3 (RF04)
- [ ] Captura de geolocalização real (expo-location) (RF05)
- [ ] Lógica de clusterização geográfica com PostGIS (`ST_DWithin`) (RF13)
- [ ] Integração com serviço de roteirização (OSRM/Google Directions) (RF14)
- [ ] Notificações push via Firebase Cloud Messaging (RF08)
- [ ] Telas restantes do mobile (Mapa, Nova Solicitação, Histórico)
- [ ] Telas restantes do web (Gestão de Solicitações, Rotas, Relatórios)
