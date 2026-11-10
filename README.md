# IW Corretora · Landing Page + Gestão de Leads

Projeto Full Stack em **React + Vite / Node.js + Express / PostgreSQL + Sequelize**. Página responsiva com formulário de cotação, API REST, gerenciamento privado de contatos e documentação.

## Stack

- **Frontend:** React, Vite, React Router, React Hook Form, Zod, Lucide, CSS responsivo.
- **Backend:** Node.js 22+, Express, Sequelize 6, PostgreSQL, Argon2id, `express-session` e sessões persistidas no banco.
- **Boas práticas:** validação em duas camadas, Helmet, CORS restrito, rate limiting, sessão HttpOnly, CSRF nas mutações administrativas, honeypot antispam, auditoria, exportação CSV com proteção contra fórmulas, variáveis de ambiente e versionamento via migrations.

## Começar no Windows / VS Code

Pré-requisitos: **Node.js 22.12+**, **PostgreSQL 15+**, Git e npm. Execute os comandos na pasta raiz `iw-corretora-fullstack`.

### 1. Instalação

```bash
npm install
```

A instalação usa npm workspaces e baixa as dependências de `frontend` e `backend`. Após isso, será gerado o `package-lock.json`. Inclua esse arquivo no Git para garantir instalações reproduzíveis.

### 2. PostgreSQL

Crie um usuário **sem permissões de superusuário** e um banco. Exemplos no `psql` usando uma conta administradora **apenas no preparo inicial**:

```sql
CREATE ROLE iw_app LOGIN PASSWORD 'ESCOLHA_AQUI_UMA_SENHA_FORTE';
CREATE DATABASE iw_corretora OWNER iw_app;
```

No ambiente de produção, restrinja ainda mais o acesso: use um usuário separado com permissões mínimas para executar a aplicação e outro para migrations.

### 3. Configurar ambiente

Copie `backend/.env.example` para `backend/.env` e preencha especialmente `DB_PASSWORD`, `SESSION_SECRET` (uma chave aleatória longa) e `FRONTEND_ORIGIN`.

No PowerShell:

```powershell
Copy-Item backend\.env.example backend\.env
```

No Git Bash:

```bash
cp backend/.env.example backend/.env
```

Para gerar um segredo criptograficamente aleatório com Node:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

**Nunca envie** `.env`, bancos, dados reais de clientes ou senhas para o GitHub ou para conversas públicas.

### 4. Criar tabelas

```bash
npm run db:migrate
```

Migrations versionadas criam `leads`, `usuarios_admin`, `auditoria` e `Sessions`.

### 5. Criar seu administrador

```bash
npm run admin:create
```

O terminal solicitará nome, e-mail e senha (mínimo de 12 caracteres). **A senha fica visível durante a digitação nesse script inicial**: faça isso apenas em terminal privado. Para produção, substitua por um provisionamento sem eco da senha ou mecanismo seguro de gestão de segredos.

### 6. Iniciar frontend e backend

```bash
npm run dev
```

- Site: `http://127.0.0.1:5173`
- Admin: `http://127.0.0.1:5173/admin`
- API: `http://127.0.0.1:4000/api/health`

O Vite encaminha requisições `/api` para o Express na porta 4000.

### 7. Validar funcionalidade

1. Abra a landing page e envie **somente dados de teste**.
2. Confira os registros na tabela `leads` usando uma ferramenta como pgAdmin.
3. Acesse `/admin` com a conta criada pelo comando acima.
4. Visualize o lead, altere seu status, inclua observação e exporte CSV.
5. Saia do painel e tente acessar novamente. A API deve exigir autenticação.

## Comandos disponíveis

| Comando | Função |
|---|---|
| `npm run dev` | React e Express em paralelo |
| `npm run build` | Build de produção do React |
| `npm run db:migrate` | Aplica migrations ao PostgreSQL |
| `npm run admin:create` | Cadastra administrador localmente |
| `npm run test` | Executa os testes automatizados incluídos |
| `npm run lint` | Lint frontend e checagem de sintaxe backend |

## Estrutura

```text
frontend/src/
  components/   Header, formulário, rodapé
  pages/        Landing page, privacidade, área administrativa
  schemas/      Validação do formulário
  services/     Cliente da API
  styles/       CSS responsivo separado por domínio
backend/
  src/controllers/  Fluxos de login, leads e gestão
  src/routes/       Endpoints HTTP
  src/middlewares/  Proteção de rotas e erros
  src/validators/   Validação Zod do servidor
  models/           Modelos Sequelize
  migrations/       Tabelas versionadas
  scripts/          Cadastro inicial de administrador
  tests/            Testes automatizados básicos
  config/           Configuração da conexão PostgreSQL
docs/                Arquitetura, API, implantação, segurança, marca
```

## Sobre as operadoras

As marcas *Hapvida, Unimed, Best Senior, Amil, Bradesco Saúde e SulAmérica* foram colocadas provisoriamente como **nomes em cards tipográficos**, não como vetores oficiais. O kit enviado pela IW só contém a marca da corretora. Para publicar os **logos originais**, obtenha os SVG/PNG autorizados de cada operadora e siga `docs/LOGOS-OPERADORAS.md`. Não use recriações de IA nem copie imagens de sites sem autorização.

## Limitações importantes antes de produção

- Ainda não há contrato/termos de privacidade revisados, canal de privacidade ou política de retenção aprovada.
- Não há infraestrutura real de deploy, domínio, HTTPS ou backup: exigem configuração do titular.
- A integração WhatsApp abre uma conversa **sem mensagem pré-preenchida** e sem compartilhar o lead.
- O painel é um MVP: ainda não há recuperação de senha, convite de usuários, permissões por papel nem dashboard histórico por dia.
- Sem serviço anti-bot externo, usa honeypot e rate limit; adicione desafio/bot detection quando houver tráfego real e abuso.
- Os testes atuais cobrem apenas sintaxe do backend e algumas utilidades, não substituem testes integrados com PostgreSQL, acessibilidade/UX e auditoria de segurança.

Consulte `docs/PRODUCAO-E-SEGURANCA.md` antes de colocar a landing page online.
# iw-landingpage
