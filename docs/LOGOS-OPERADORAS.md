# Uso correto das marcas das operadoras

O arquivo de identidade visual recebido da IW contém **apenas as marcas oficiais da própria corretora**. Logo, os seis cards da landing page exibem atualmente nomes tipográficos como placeholders: eles **não são os logotipos originais**.

Para finalizar a implementação:

1. Peça aos contatos comerciais das operadoras os arquivos oficiais de marca em SVG/PNG e a autorização/regras de uso da identidade de cada uma.
2. Coloque os arquivos aprovados em `frontend/public/assets/operadoras/` com nomes como `amil.svg`.
3. Em `frontend/src/data/content.js`, inclua uma propriedade `logo` com o caminho de cada arquivo.
4. Em `frontend/src/pages/Home.jsx`, substitua o `span` do card por `<img src={op.logo} alt={op.nome} loading="lazy" />`, com CSS `max-width` e `object-fit:contain`.
5. Preserve cores, proporções, margens de respiro e eventuais textos obrigatórios da marca.

**Não use** marcas geradas por IA ou copias não autorizadas de concorrentes/intermediários. Confirme o nome e a versão atual de cada marca (ex.: rebrands recentes) com o parceiro. As coberturas e disponibilidades dependem de cada produto, cidade e categoria de contratação.
