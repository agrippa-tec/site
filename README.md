# agrippa.tec.br

Site institucional da Agrippa Tec — estático, sem backend, sem
rastreadores. Publicado via GitHub Pages com domínio customizado.

## Estrutura

- `/` — home da empresa (quem somos, produtos, contato)
- `/strabo/` — landing do app Strabo
- `/strabo/privacidade/` — política de privacidade (exigida pelas lojas)
- `CNAME` — domínio customizado do GitHub Pages

## Regra do repo

**Público por natureza** — só entra aqui o que já é público: HTML, CSS,
imagens de marca e screenshots de loja. Nunca segredos, documentos
pessoais ou credenciais.

## Deploy

GitHub Pages → branch `main`, raiz. DNS no registro.br aponta
`agrippa.tec.br` para os IPs do GitHub Pages (A) e
`www.agrippa.tec.br` → `agrippa-tec.github.io` (CNAME).
