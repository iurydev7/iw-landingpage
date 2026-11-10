# Arquitetura e fluxo dos dados

```text
Visitante no site (React/Vite)
      |
      | POST /api/v1/leads (JSON validado)
      v
Express + Helmet + Rate limit + Zod
      |
      | Sequelize ORM
      v
PostgreSQL [leads]  <-  Admin protegido por sessão e token CSRF
      ^                       |
      |                       | GET/PATCH/DELETE /api/v1/admin/leads
      +-----------------------+

Admin Login -> POST /api/v1/auth/login -> Argon2id -> sessao HttpOnly
                                         |-> Sessions (PostgreSQL)
```

- **Frontend** não acessa diretamente o banco de dados. Cada acesso passa pela API.
- **Validação no navegador** melhora a experiência do usuário; **validação no servidor** é obrigatória e autoritativa.
- O formulário nunca armazena lead no localStorage. Se a API estiver offline, informa erro e o envio não é concluído.
- Os dados do painel só podem ser acessados após login no servidor. `ProtectedRoute` de React sozinho seria insuficiente.
- O status é alterado por `PATCH` e a ação fica registrada na tabela `auditoria` sem detalhes sensíveis.
- Migrations administram a estrutura PostgreSQL. Nunca use `sync({force:true})` em produção.

## Recursos que podem vir depois

1. Integração com WhatsApp Business oficial e notificações com fila/filtragem de duplicidade.
2. Perfil `gestor` e `consultor`, com permissões definidas pelo servidor.
3. Histórico de atendimento com datas, eventos e indicadores de conversão.
4. Relatórios de aquisição por UTM e período, com retenção e permissões apropriadas.
5. Proteção anti-bot adicional e testes end-to-end com banco isolado.
