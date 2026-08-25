-- Migração inicial — baseada no DER da Extensão III
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  cpf CHAR(11) UNIQUE NOT NULL,
  telefone VARCHAR(15),
  tipo ENUM_TIPO_USUARIO,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TYPE enum_tipo_usuario AS ENUM ('CIDADAO', 'ADMIN', 'EQUIPE');
ALTER TABLE usuarios ALTER COLUMN tipo TYPE enum_tipo_usuario USING tipo::enum_tipo_usuario;

CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(80) UNIQUE NOT NULL,
  descricao TEXT,
  icone VARCHAR(100),
  ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE grupos_atendimento (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  centro_latitude DECIMAL(10,7),
  centro_longitude DECIMAL(10,7),
  raio_metros INTEGER DEFAULT 500,
  status VARCHAR(20) DEFAULT 'aberto',
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE solicitacoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES usuarios(id),
  categoria_id UUID REFERENCES categorias(id),
  grupo_id UUID REFERENCES grupos_atendimento(id),
  titulo VARCHAR(150),
  descricao TEXT,
  status VARCHAR(20) DEFAULT 'aberta',
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  endereco VARCHAR(255),
  criada_em TIMESTAMP DEFAULT NOW(),
  atualizada_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE imagens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  solicitacao_id UUID REFERENCES solicitacoes(id) ON DELETE CASCADE,
  url VARCHAR(300) NOT NULL,
  nome_arquivo VARCHAR(200),
  mime_type VARCHAR(50),
  tamanho BIGINT,
  criada_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ordens_servico (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grupo_id UUID REFERENCES grupos_atendimento(id),
  equipe_id UUID REFERENCES usuarios(id),
  descricao TEXT,
  data_atribuicao TIMESTAMP,
  data_inicio TIMESTAMP,
  data_conclusao TIMESTAMP,
  observacoes TEXT
);

CREATE TABLE notificacoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES usuarios(id),
  solicitacao_id UUID REFERENCES solicitacoes(id),
  titulo VARCHAR(150),
  mensagem TEXT,
  lida BOOLEAN DEFAULT FALSE,
  tipo VARCHAR(30),
  criada_em TIMESTAMP DEFAULT NOW()
);

-- Índices úteis para consultas por status/categoria/geolocalização
CREATE INDEX idx_solicitacoes_status ON solicitacoes(status);
CREATE INDEX idx_solicitacoes_categoria ON solicitacoes(categoria_id);
CREATE INDEX idx_solicitacoes_geo ON solicitacoes(latitude, longitude);
