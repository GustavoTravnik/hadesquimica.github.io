# Chemi Pharma – site estático

Site institucional da Chemi Pharma em HTML/CSS/JS puros, publicado pelo GitHub Pages em
`https://novo.chemipharma.com.br/` (e, nos testes, em `https://gustavotravnik.github.io/hadesquimica.github.io/`).

Sem frameworks, CDN ou fontes externas. O único passo de build é um script Node (≥ 18) **sem dependências npm**;
o HTML gerado fica commitado, então o GitHub Pages serve direto, sem GitHub Actions.

## Estrutura

```
CNAME  .nojekyll  index.html  404.html  robots.txt  sitemap.xml  favicon.svg   # raiz publicada
<slug>/index.html          # páginas GERADAS (não edite à mão)
assets/css/style.css       # tokens de design em :root + estilos
assets/js/main.js          # menu, formulário, âncoras, ano do rodapé
src/content.json           # TODO o conteúdo (única fonte da verdade) + flags
src/icones.json            # ícones SVG inline
src/templates/*.html       # layout, header, footer, páginas e componentes (marcadores {{x}} / {{{html}}})
scripts/build.mjs          # gerador            scripts/dev.mjs    # servidor local
scripts/check.mjs          # verificações
```

## Como usar

```bash
npm run build   # gera todas as páginas, 404.html, sitemap.xml e robots.txt
npm run check   # links quebrados, âncoras, IDs duplicados, <img> sem alt, title/description, h1, TODOs visíveis
npm run dev     # http://localhost:8080/  e  http://localhost:8080/hadesquimica.github.io/ (simula subpasta)
```

Para editar textos: altere `src/content.json`, rode `npm run build` e `npm run check`, e faça commit dos arquivos gerados.

### Flags do `content.json`

| Flag | Padrão | Efeito |
|---|---|---|
| `mostrarPendencias` | `false` | `true` exibe os `TODO: CONFIRMAR…` destacados em amarelo (apenas para revisão). |
| `indexavel` | `false` | `false` gera `<meta name="robots" content="noindex">` e `Disallow: /` no `robots.txt`. Ao publicar de verdade, mude para `true` e rode o build. |
| `seo.urlBase` | `https://novo.chemipharma.com.br/` | Base de canonical, Open Graph, sitemap e da `404.html`. Mude aqui se o domínio final for `www.`. |

### Observações técnicas

- Todos os caminhos são relativos (`../assets/…`), então o site funciona na raiz e em subpasta.
  **Exceção:** `404.html` usa `seo.urlBase`, pois o GitHub Pages a serve em qualquer profundidade de URL.
- O formulário de contato não tem backend: monta mensagem para WhatsApp ou `mailto:`. Veja o comentário em `assets/js/main.js`
  para trocar por um serviço como Formspree (somente com autorização do cliente).
- Sem JavaScript: menu aberto em coluna e formulário com `mailto:` direto no `action`.
- O conteúdo do site antigo (um `index.html` modelo) foi removido da árvore e permanece apenas no histórico do git.

## Publicação (passo a passo — não automatizado)

1. Na branch de trabalho: `npm run build` → `npm run check` → `npm run dev` e conferir em `localhost:8080` e na subpasta.
2. Abrir Pull Request da branch `refactor/novo-site` para `main` (ou pedir o merge).
3. GitHub → Settings → Pages: fonte = branch `main`, pasta `/ (root)`; Custom domain = `novo.chemipharma.com.br`;
   marcar **Enforce HTTPS** quando liberado (o DNS de `novo` já aponta para `gustavotravnik.github.io`).
4. Testar `https://novo.chemipharma.com.br/` e `https://novo.chemipharma.com.br/#produtos`.

### Virada do domínio raiz (não executar sem planejamento)

Substituir o site atual (Wix) em `chemipharma.com.br`/`www` **desliga o site em produção**. Passos e riscos:

1. Definir o domínio final (`www.` ou raiz), trocar `seo.urlBase`, `CNAME`, `indexavel: true` e rodar o build.
2. Apontar o DNS (registros A/AAAA do GitHub Pages ou CNAME `www` → `gustavotravnik.github.io`) — a propagação leva horas; há risco de e-mail
   (registros MX/SPF) ser afetado se o DNS for reorganizado: preservá-los.
3. Redirecionamentos 301 das URLs antigas (ex.: `lista-de-produtos-e-preços` → `lista-de-produtos-e-precos/`): o GitHub Pages não
   suporta 301 por regra; a Wix cuida disso no painel enquanto estiver ativa. Depois da virada, considerar páginas-ponte com
   `<meta http-equiv="refresh">` + canonical, ou um proxy/CDN.
4. Ter plano de reversão (manter o DNS antigo documentado) e reenviar o sitemap ao Google Search Console.
