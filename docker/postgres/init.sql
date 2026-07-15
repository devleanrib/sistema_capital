-- Criacao do banco de dados capital_db
-- Este script e executado automaticamente quando o container PostgreSQL inicia

-- Verifica se o banco ja existe antes de criar
SELECT 'CREATE DATABASE capital_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'capital_db')\gexec

-- Conecta ao banco capital_db
\c capital_db

-- Cria a tabela de empreendimentos
CREATE TABLE IF NOT EXISTS empreendimentos (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado CHAR(2) NOT NULL,
    valor_total DECIMAL(15, 2) NOT NULL CHECK (valor_total > 0),
    quantidade_unidades INTEGER NOT NULL CHECK (quantidade_unidades > 0),
    valor_unidade DECIMAL(15, 2) NOT NULL CHECK (valor_unidade > 0),
    status VARCHAR(20) NOT NULL CHECK (status IN ('em_lancamento', 'em_obras', 'entregue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cria indice para buscas por nome
CREATE INDEX IF NOT EXISTS idx_empreendimentos_nome ON empreendimentos(nome);

-- Cria indice para filtros por status
CREATE INDEX IF NOT EXISTS idx_empreendimentos_status ON empreendimentos(status);

-- Cria indice para buscas por cidade
CREATE INDEX IF NOT EXISTS idx_empreendimentos_cidade ON empreendimentos(cidade);

-- Insere dados de exemplo (seeders)
INSERT INTO empreendimentos (nome, cidade, estado, valor_total, quantidade_unidades, valor_unidade, status) VALUES
('Residencial Aurora', 'Sao Paulo', 'SP', 45000000.00, 120, 375000.00, 'em_lancamento'),
('Condominio Vista Verde', 'Campinas', 'SP', 28000000.00, 80, 350000.00, 'em_obras'),
('Torre São Paulo', 'Sao Paulo', 'SP', 95000000.00, 200, 475000.00, 'entregue'),
('Residencial Praia Sul', 'Rio de Janeiro', 'RJ', 62000000.00, 150, 413333.33, 'em_lancamento'),
('Edificio Copacabana', 'Rio de Janeiro', 'RJ', 78000000.00, 180, 433333.33, 'em_obras'),
('Condominio Serra Azul', 'Belo Horizonte', 'MG', 35000000.00, 100, 350000.00, 'entregue'),
('Residencial Lago Dourado', 'Curitiba', 'PR', 42000000.00, 110, 381818.18, 'em_lancamento'),
('Empresarial Tech Park', 'Florianopolis', 'SC', 55000000.00, 90, 611111.11, 'em_obras');
