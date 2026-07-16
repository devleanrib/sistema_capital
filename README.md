# Sistema Capital — Sistema de Gerenciamento de Empreendimentos

Sistema interno para incorporadora imobiliária gerenciar empreendimentos. Desenvolvido com Laravel (backend), React + TypeScript (frontend) e PostgreSQL (banco de dados).

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

---

## Como Iniciar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/devleanrib/sistema_capital.git
cd sistema_capital
```

### 2. Subir os containers Docker

```bash
docker compose up -d --build
```

Isso irá iniciar:
- **PostgreSQL 15** na porta `5433`
- **Backend Laravel** na porta `8002`
- **Frontend (nginx)** na porta `3000`

O banco de dados será criado automaticamente com 8 empreendimentos de exemplo.

### 3. Verificar se os containers estão rodando

```bash
docker compose ps
```

Você deve ver 3 containers rodando:
- `capital_postgres` — PostgreSQL 15
- `capital_backend` — Laravel API
- `capital_frontend` — React (nginx)

### 4. Acessar a aplicação

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8002/api |

---

## Configuração do Arquivo `.env`

O arquivo `.env` já está configurado para funcionar com o Docker. Caso precise alterar:

```bash
# Banco de dados
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=capital_db
DB_USERNAME=capital_user
DB_PASSWORD=capital_secret
```

**Nota:** O `DB_HOST` deve ser `postgres` (nome do container Docker), não `localhost`.

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/status` | Status da API |
| GET | `/api/empreendimentos` | Listar empreendimentos |
| GET | `/api/empreendimentos/{id}` | Visualizar empreendimento |
| POST | `/api/empreendimentos` | Cadastrar empreendimento |
| PUT | `/api/empreendimentos/{id}` | Atualizar empreendimento |
| DELETE | `/api/empreendimentos/{id}` | Excluir empreendimento |

### Parâmetros de consulta (Index)

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `busca` | string | Busca por nome (parcial) |
| `status` | string | Filtra por status exato |

### Status possíveis

| Valor | Descrição |
|-------|-----------|
| `em_lancamento` | Em lançamento |
| `em_obras` | Em obras |
| `entregue` | Entregue |

---

## Estrutura do Projeto

```
/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/    # Controllers
│   │   │   ├── Requests/       # Validações
│   │   │   └── Resources/      # API Resources
│   │   └── Models/             # Models
│   ├── database/
│   │   ├── migrations/         # Migrations
│   │   └── seeders/            # Seeders
│   ├── routes/
│   │   └── api.php             # Rotas da API
│   └── Dockerfile              # Docker do backend
├── frontend/                   # React + TypeScript
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── pages/              # Páginas
│   │   ├── services/           # Serviços API
│   │   └── types/              # Tipos TypeScript
│   ├── Dockerfile              # Docker do frontend (multi-stage)
│   ├── nginx.conf              # Configuração nginx (reverse proxy)
│   └── vite.config.ts          # Configuração Vite
├── docker/
│   └── postgres/
│       └── init.sql            # Criação do banco + dados iniciais
├── docker-compose.yml          # Containers Docker
├── .env.example                # Variáveis de ambiente
└── README.md                   # Este arquivo
```

---

## Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Backend | Laravel 11, PHP 8.4 |
| Frontend | React 18, TypeScript, Vite |
| Banco | PostgreSQL 15 |
| Infra | Docker, Docker Compose, nginx |

---

## Decisões Técnicas

### Docker Compose
O Docker Compose orquestra os 3 serviços: PostgreSQL, Backend (Laravel) e Frontend (nginx). O frontend é servido estaticamente pelo nginx, que também faz proxy reverso das requisições `/api` para o backend.

### Nginx Reverse Proxy
O nginx serve os arquivos estáticos do build do React e redireciona requisições `/api` para o container do backend Laravel, garantindo que a SPA funcione corretamente com rotas do React Router.

### API Resource
Utilizado `EmpreendimentoResource` para padronizar as respostas da API com formato consistente.

### Validações
Validações implementadas via Form Requests (`StoreEmpreendimentoRequest` e `UpdateEmpreendimentoRequest`) com mensagens de erro em português.

### Tratamento de Erros
Utilizado o padrão nativo do Laravel 11 (`withExceptions` em `bootstrap/app.php`) para retornar JSON padronizado em todas as rotas da API, com tratamento específico para validações (422), recursos não encontrados (404) e erros genéricos (500).

### Database
O banco de dados é criado automaticamente pelo `init.sql` do PostgreSQL quando o container é iniciado. As migrations do Laravel servem para documentar a estrutura e permitir futuras alterações.

---

## Comandos Úteis

### Docker

```bash
# Build e iniciar todos os containers
docker compose up -d --build

# Parar todos os containers
docker compose down

# Ver logs
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f frontend
docker compose logs -f backend

# Acessar o PostgreSQL
docker compose exec postgres psql -U capital_user -d capital_db

# Ver empreendimentos no banco
docker compose exec postgres psql -U capital_user -d capital_db -c "SELECT * FROM empreendimentos;"
```

### Frontend (local — desenvolvimento)

```bash
# Instalar dependências
cd frontend && npm install

# Iniciar servidor de desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build
```

### Backend (local — desenvolvimento)

```bash
# Acessar o container do backend
docker compose exec backend bash

# Gerar chave da aplicação (já automático no Dockerfile)
php artisan key:generate

# Executar migrations
php artisan migrate

# Executar seeders
php artisan db:seed
```
