# API REST — v1

Base local: `http://127.0.0.1:4000/api`

| Método | Rota | Acesso | Finalidade |
|---|---|---|---|
| GET | `/health` | público | Healthcheck |
| POST | `/v1/leads` | público + rate limit | Novo lead |
| POST | `/v1/auth/login` | público + rate limit | Login |
| GET | `/v1/auth/me` | sessão | Usuário atual e token CSRF |
| POST | `/v1/auth/logout` | sessão + `x-csrf-token` | Logout |
| GET | `/v1/admin/summary` | sessão | Contadores por status |
| GET | `/v1/admin/leads` | sessão | Lista paginada |
| GET | `/v1/admin/leads/:id` | sessão | Detalhe |
| PATCH | `/v1/admin/leads/:id` | sessão + CSRF | Status e notas |
| DELETE | `/v1/admin/leads/:id` | sessão + CSRF | Exclusão permanente |
| GET | `/v1/admin/leads/export` | sessão | CSV (máximo 10 mil por exportação) |

### Corpo de criação de lead

```json
{
  "nome": "Maria da Silva",
  "whatsapp": "(85) 99999-9999",
  "email": "maria@example.com",
  "estado": "CE",
  "cidade": "Fortaleza",
  "tipoPlano": "Familiar",
  "quantidadeBeneficiarios": 3,
  "empresa": "",
  "cnpj": "",
  "origem": "landing-page",
  "utmSource": "",
  "utmMedium": "",
  "utmCampaign": "",
  "aceitePrivacidade": true,
  "autorizacaoMarketing": false,
  "website": ""
}
```

**Resposta 201:** `{"message":"Solicitação recebida.","id":"UUID"}`

**Erros típicos:** 400 (dados inválidos), 401 (não autenticado), 403 (CSRF/origem), 404 (recurso ausente), 429 (muitas tentativas), 500 (falha interna genérica).

### Autenticação

O cookie de sessão é HttpOnly e não fica disponível via JS. Após login, o front mantém em memória o `csrfToken` retornado pela API e envia em `x-csrf-token` nas mutações protegidas. Atualizar a página chama `GET /v1/auth/me` para recuperar a sessão.

### Paginação

`GET /v1/admin/leads?page=1&limit=12&status=novo&search=Maria`

Resposta: `{rows, count, page, limit, totalPages}`.
