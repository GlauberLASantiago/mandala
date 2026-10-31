-- Esquema de referência para o novo Mandala (PostgreSQL 15+).
-- Sem dados reais. IDs legados permitem importação rastreável e reversível.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE prioridade_componente AS ENUM ('NFO', 'NFE', 'NFC');
CREATE TYPE situacao_registro AS ENUM ('ativo', 'inativo');
CREATE TYPE modalidade_curso AS ENUM ('distancia', 'presencial', 'misto');

CREATE TABLE curso (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  nome text NOT NULL,
  tipo_curso smallint,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE habilitacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  curso_id uuid NOT NULL REFERENCES curso(id),
  nome text NOT NULL,
  letra varchar(16) NOT NULL,
  cor varchar(16),
  situacao situacao_registro NOT NULL DEFAULT 'ativo',
  UNIQUE (curso_id, letra)
);

CREATE TABLE componente_curricular (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  nome varchar(256) NOT NULL UNIQUE,
  carga_horaria integer NOT NULL CHECK (carga_horaria > 0 AND carga_horaria <= 10000),
  ementa text,
  bibliografia text,
  situacao situacao_registro NOT NULL DEFAULT 'ativo',
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now(),
  deletado_em timestamptz
);

CREATE TABLE componente_habilitacao (
  componente_id uuid NOT NULL REFERENCES componente_curricular(id),
  habilitacao_id uuid NOT NULL REFERENCES habilitacao(id),
  prioridade prioridade_componente NOT NULL,
  PRIMARY KEY (componente_id, habilitacao_id)
);

CREATE TABLE pessoa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_cpf varchar(32) UNIQUE,
  nome varchar(160) NOT NULL,
  sobrenome varchar(160),
  email varchar(320),
  telefone_fixo varchar(40),
  telefone_celular varchar(40),
  endereco text,
  numero varchar(32),
  bairro varchar(160),
  complemento varchar(160),
  cep varchar(16),
  situacao situacao_registro NOT NULL DEFAULT 'ativo',
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now(),
  deletado_em timestamptz
);

CREATE TABLE usuario (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id uuid NOT NULL UNIQUE REFERENCES pessoa(id),
  senha_hash text,
  deve_redefinir_senha boolean NOT NULL DEFAULT true,
  ultimo_acesso timestamptz
);

CREATE TABLE papel_usuario (
  usuario_id uuid NOT NULL REFERENCES usuario(id),
  papel varchar(80) NOT NULL,
  PRIMARY KEY (usuario_id, papel)
);

CREATE TABLE inscricao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  pessoa_id uuid NOT NULL REFERENCES pessoa(id),
  curso_id uuid REFERENCES curso(id),
  ra varchar(64),
  numero_ufscar varchar(64),
  sexo varchar(32),
  data_nascimento date,
  naturalidade varchar(160),
  nome_mae varchar(320),
  nome_pai varchar(320),
  estado_civil varchar(64),
  telefone_alternativo varchar(40),
  cargo_atual text,
  empresa text,
  telefone_comercial varchar(40),
  whatsapp varchar(80),
  skype varchar(160),
  tipo_identidade varchar(80),
  identidade varchar(80),
  orgao_expedidor varchar(160),
  modalidade modalidade_curso,
  candidato_a_bolsa boolean NOT NULL DEFAULT false,
  recebe_bolsa boolean NOT NULL DEFAULT false,
  tipo_bolsa text,
  observacoes text,
  comentarios text,
  status integer,
  status_aluno varchar(80),
  data_matricula date,
  data_conclusao date,
  processo_proex varchar(160),
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE documento_aluno (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inscricao_id uuid NOT NULL REFERENCES inscricao(id),
  tipo varchar(80) NOT NULL CHECK (tipo IN ('cpf','rg','diploma','comprovante_residencia','curriculo')),
  chave_armazenamento_privado text NOT NULL,
  nome_original text,
  UNIQUE (inscricao_id, tipo)
);

CREATE TABLE formacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  inscricao_id uuid NOT NULL REFERENCES inscricao(id),
  nivel varchar(160),
  curso text,
  ano_conclusao integer,
  instituicao text
);

CREATE TABLE inscricao_habilitacao (
  inscricao_id uuid NOT NULL REFERENCES inscricao(id),
  habilitacao_id uuid NOT NULL REFERENCES habilitacao(id),
  ordem smallint NOT NULL CHECK (ordem > 0),
  data_conclusao date,
  processo_proex varchar(160),
  PRIMARY KEY (inscricao_id, habilitacao_id),
  UNIQUE (inscricao_id, ordem)
);

CREATE TABLE inscricao_componente (
  inscricao_id uuid NOT NULL REFERENCES inscricao(id),
  componente_id uuid NOT NULL REFERENCES componente_curricular(id),
  periodo smallint NOT NULL CHECK (periodo > 0),
  PRIMARY KEY (inscricao_id, componente_id)
);

CREATE TABLE oferta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  componente_id uuid NOT NULL REFERENCES componente_curricular(id),
  ano integer NOT NULL CHECK (ano BETWEEN 2000 AND 2200),
  mes smallint NOT NULL CHECK (mes BETWEEN 1 AND 12),
  data_inicio date,
  link_moodle text,
  codigo_moodle varchar(160),
  turma integer,
  situacao situacao_registro NOT NULL DEFAULT 'ativo',
  UNIQUE (componente_id, ano, mes, turma)
);

CREATE TABLE oferta_responsavel (
  oferta_id uuid NOT NULL REFERENCES oferta(id),
  pessoa_id uuid NOT NULL REFERENCES pessoa(id),
  funcao varchar(32) NOT NULL CHECK (funcao IN ('docente','tutor')),
  PRIMARY KEY (oferta_id, pessoa_id, funcao)
);

CREATE TABLE inscricao_oferta (
  inscricao_id uuid NOT NULL REFERENCES inscricao(id),
  oferta_id uuid NOT NULL REFERENCES oferta(id),
  nota_virtual numeric(5,2),
  nota_presencial numeric(5,2),
  media numeric(5,2),
  frequencia numeric(5,2),
  status varchar(80),
  confirmada boolean NOT NULL DEFAULT false,
  PRIMARY KEY (inscricao_id, oferta_id)
);

CREATE TABLE tcc (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  inscricao_id uuid NOT NULL REFERENCES inscricao(id),
  habilitacao_id uuid NOT NULL REFERENCES habilitacao(id),
  titulo text,
  tipo varchar(80),
  caracterizacao_perfil text,
  caracterizacao_importancia text,
  caracterizacao_saberes text,
  caracterizacao_atividades text,
  caracterizacao_desafios text,
  validacao_arquivo_privado text,
  validacao_data_entrega timestamptz,
  validacao_orientador_id uuid REFERENCES pessoa(id),
  validacao_consideracoes text,
  validacao_tem_pendencias boolean,
  banca_arquivo_privado text,
  banca_data_entrega timestamptz,
  banca_data_apresentacao timestamptz,
  banca_tem_pendencias boolean,
  final_arquivo_doc_privado text,
  final_arquivo_pdf_privado text,
  final_data_entrega timestamptz,
  orientador_final_id uuid REFERENCES pessoa(id),
  coorientador_final_id uuid REFERENCES pessoa(id),
  aprovado boolean,
  UNIQUE (inscricao_id, habilitacao_id)
);

CREATE TABLE tcc_banca_membro (
  tcc_id uuid NOT NULL REFERENCES tcc(id),
  pessoa_id uuid NOT NULL REFERENCES pessoa(id),
  posicao smallint NOT NULL CHECK (posicao BETWEEN 1 AND 3),
  eh_tutor boolean NOT NULL DEFAULT false,
  consideracoes text,
  PRIMARY KEY (tcc_id, posicao)
);

CREATE TABLE sintese_componente (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  tcc_id uuid NOT NULL REFERENCES tcc(id),
  componente_id uuid NOT NULL REFERENCES componente_curricular(id),
  ordem smallint NOT NULL,
  descricao text,
  reflexao text,
  UNIQUE (tcc_id, ordem)
);

CREATE TABLE proposta_pedagogica (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  tcc_id uuid NOT NULL REFERENCES tcc(id),
  ordem smallint NOT NULL,
  titulo text,
  nivel_formacao varchar(80),
  area_conhecimento varchar(80),
  modalidade modalidade_curso,
  nome_ferramenta text,
  descricao_dinamica text,
  descricao_diferenciais text,
  descricao_procedimentos text,
  descricao_reflexao text,
  descricao_abordagem text,
  descricao_referencias text,
  tipo_proposta varchar(160),
  UNIQUE (tcc_id, ordem)
);

CREATE TABLE encontro_presencial (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  tipo varchar(160),
  local text,
  data_inicio timestamptz,
  atividades text,
  situacao situacao_registro NOT NULL DEFAULT 'ativo',
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now(),
  deletado_em timestamptz
);

CREATE TABLE encontro_presenca (
  encontro_id uuid NOT NULL REFERENCES encontro_presencial(id),
  inscricao_id uuid NOT NULL REFERENCES inscricao(id),
  presente boolean NOT NULL DEFAULT false,
  PRIMARY KEY (encontro_id, inscricao_id)
);

CREATE TABLE pagamento_aluno (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  inscricao_id uuid NOT NULL REFERENCES inscricao(id),
  tipo varchar(80),
  data_pagamento date,
  valor numeric(12,2),
  observacoes text
);

CREATE TABLE pagamento_colaborador (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  pessoa_id uuid NOT NULL REFERENCES pessoa(id),
  data_pagamento date,
  forma_pagamento varchar(80),
  valor_total numeric(12,2),
  valor_pago numeric(12,2),
  observacoes text
);

CREATE TABLE servico_colaborador (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  pagamento_colaborador_id uuid NOT NULL REFERENCES pagamento_colaborador(id),
  funcao varchar(160),
  valor numeric(12,2),
  descricao text
);

CREATE TABLE bolsa (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  pessoa_id uuid NOT NULL REFERENCES pessoa(id),
  descricao text,
  valor numeric(12,2),
  data_pagamento date
);

CREATE TABLE viagem (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  pessoa_id uuid NOT NULL REFERENCES pessoa(id),
  local text,
  data_ida date,
  data_volta date
);

CREATE TABLE despesa_viagem (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  viagem_id uuid NOT NULL REFERENCES viagem(id),
  tipo varchar(160),
  valor numeric(12,2)
);

CREATE TABLE compra (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origem_legado_id bigint UNIQUE,
  pessoa_id uuid REFERENCES pessoa(id),
  data_compra date,
  descricao text,
  local text,
  valor numeric(12,2)
);

CREATE TABLE configuracao (
  chave varchar(160) PRIMARY KEY,
  valor text,
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE log_importacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  executado_em timestamptz NOT NULL DEFAULT now(),
  origem varchar(80) NOT NULL,
  tabela_origem varchar(160) NOT NULL,
  id_origem varchar(160) NOT NULL,
  tabela_destino varchar(160) NOT NULL,
  id_destino uuid,
  status varchar(32) NOT NULL,
  detalhe text
);

CREATE INDEX idx_oferta_periodo ON oferta (ano, mes);
CREATE INDEX idx_inscricao_curso ON inscricao (curso_id);
CREATE INDEX idx_inscricao_oferta_oferta ON inscricao_oferta (oferta_id);
CREATE INDEX idx_tcc_inscricao ON tcc (inscricao_id);
