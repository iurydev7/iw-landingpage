# Checklist de segurança e publicação (pendências obrigatórias)

Este projeto é **uma base**, não um certificado de segurança ou de conformidade LGPD. Antes de coletar dados reais na internet, faça revisão técnica/jurídica e execute o checklist abaixo.

## Infraestrutura

- [ ] Hospedagem confiável, HTTPS com certificado válido, HSTS e DNS corretos.
- [ ] Frontend e API preferencialmente no mesmo domínio: `/` servido pelo site e `/api` pelo proxy ao Express.
- [ ] Configure `NODE_ENV=production`, `FRONTEND_ORIGIN=https://DOMINIO-OFICIAL`, `TRUST_PROXY=1` somente se o provedor fornecer proxy confiável, `SESSION_SECRET` forte.
- [ ] PostgreSQL restrito a redes privadas, não exposto na internet pública.
- [ ] Conta SQL da aplicação com privilégios mínimos; conta separada para migrations.
- [ ] Backup automatizado criptografado e teste documentado de restauração.
- [ ] Monitoramento de disponibilidade, logs sem PII, alertas de segurança.
- [ ] Política de atualizações e auditoria de dependências (`npm audit`, versões fixadas via lockfile).
- [ ] Proteção contra abusos distribuídos (rate limit em serviço compartilhado ou proxy, não somente memória local).

## Aplicação

- [ ] Instalar dependências, gerar/commitar `package-lock.json`, executar build, lint e testes.
- [ ] Rodar migrations em banco de teste e verificar rollback/backup.
- [ ] Testar 400, 401, 403, 429, 500 e validação do formulário.
- [ ] Testar sessões: timeout, destruição, fixação, cookie HTTPS, origin/CSRF.
- [ ] Implementar provisionamento de administrador com **senha oculta**, MFA e recuperação de acesso apropriada.
- [ ] Revisar política de permissões, visualização/exportação de PII e logs de auditoria.
- [ ] Revisar anti-spam avançado quando houver tráfego real.
- [ ] Testar acessibilidade (teclado, mobile, leitores de tela) e performance real.
- [ ] Garantir que não há credenciais, arquivos `.env` ou backups versionados.

## LGPD

- [ ] Revisão legal da Política de Privacidade e definição do canal oficial do titular.
- [ ] Hipótese legal para atendimento de cotação documentada; finalidades e terceiros identificados.
- [ ] Política de retenção/descarte com rotina executável e resposta a pedidos do titular.
- [ ] Contratos/termos com operadores de dados e fornecedores (hospedagem, CRM, e-mail, analytics).
- [ ] Consentimento ou base adequada e registro para comunicações de marketing, separados da cotação.
- [ ] Avaliação do uso de cookies/analytics e banners quando aplicável.

## Logos das operadoras

- [ ] Arquivos oficiais aprovados de todos os parceiros, aplicados conforme seus guias.
- [ ] Nomes de produtos/regiões/modos de contratação revisados pela área comercial.

## Referências técnicas

- Vite: https://vite.dev/guide/
- Sequelize v6: https://sequelize.org/docs/v6/other-topics/migrations/
- OWASP Session Management: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- MDN Session Management: https://developer.mozilla.org/en-US/docs/Web/Security/Authentication/Session_management
- ANPD: https://www.gov.br/anpd/pt-br
