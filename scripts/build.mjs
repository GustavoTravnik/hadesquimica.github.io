// Gerador do site estático da Chemi Pharma (Node >= 18, sem dependências npm).
// Lê src/content.json + src/templates/*.html e escreve os index.html, 404.html,
// sitemap.xml e robots.txt na raiz do repositório. Idempotente.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderTabelaProdutosHtml } from './render-tabela-produtos.mjs';
import { gerarRelatorioProdutos } from './gerar-relatorio.mjs';
import { normalizarProdutos } from './normalizar-produtos.mjs';

// Normaliza produtos a partir do bruto antes do build
normalizarProdutos();

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (...p) => readFileSync(join(RAIZ, ...p), 'utf8');
const c = JSON.parse(ler('src', 'content.json'));
const icones = JSON.parse(ler('src', 'icones.json'));
const modelos = {};
const modelo = (nome) => (modelos[nome] ??= ler('src', 'templates', `${nome}.html`));

// ---------- utilidades ----------
const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

// {{x}} = texto escapado; {{{x}}} = HTML bruto.
const render = (tpl, dados) =>
  tpl.replace(/\{\{\{(\w+)\}\}\}|\{\{(\w+)\}\}/g, (_, bruto, simples) => {
    const chave = bruto ?? simples;
    if (!(chave in dados)) throw new Error(`Marcador sem valor: ${chave}`);
    return bruto ? String(dados[chave] ?? '') : esc(dados[chave]);
  });

const icone = (nome, classe = 'icone') =>
  `<svg class="${classe}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icones[nome]}</svg>`;

const ehPendencia = (t) => /^TODO/.test(t);
// Pendências só aparecem quando mostrarPendencias = true.
const pendencia = (texto) =>
  c.mostrarPendencias && texto
    ? `<p class="pendencia" role="note"><strong>Pendência:</strong> ${esc(texto)}</p>`
    : '';
const paragrafos = (lista, classe = '') =>
  lista
    .map((t) => (ehPendencia(t) ? pendencia(t) : `<p${classe ? ` class="${classe}"` : ''}>${esc(t)}</p>`))
    .filter(Boolean)
    .join('\n');

const emp = c.empresa;
const wa = emp.whatsapp;
const whatsappUrl = `https://api.whatsapp.com/send?phone=${wa.numero}&text=${encodeURIComponent(wa.mensagem)}`;
const base = c.seo.urlBase;
const urlDe = (slug) => base + (slug ? `${slug}/` : '');
const hrefDe = (raiz, slug) => raiz + (slug ? `${slug}/` : '');

// ---------- componentes ----------
const cta = (raiz, destino = 'contacto') =>
  render(modelo('cta'), { href: hrefDe(raiz, destino), rotulo: c.ui.cta }).trim();
const ph = (p) => render(modelo('placeholder'), p).trim();

function menu(raiz, atual) {
  const subAtivo = c.servicos.some((s) => s.slug === atual);
  return c.menu
    .map((it) => {
      const href = hrefDe(raiz, it.slug);
      const ativo = it.slug === atual;
      const link = `<a href="${href}"${ativo ? ' aria-current="page"' : ''}>${esc(it.rotulo)}</a>`;
      if (!it.submenu) return `          <li>${link}</li>`;
      const subs = c.servicos
        .map((s) => `<li><a href="${hrefDe(raiz, s.slug)}"${s.slug === atual ? ' aria-current="page"' : ''}>${esc(s.menu)}</a></li>`)
        .join('\n              ');
      return `          <li class="nav__item--sub${subAtivo ? ' is-ativo' : ''}">
            ${link}
            <button class="nav__sub-botao" type="button" aria-expanded="false" aria-controls="submenu-servicos" aria-label="Submenu de ${esc(it.rotulo)}">${icone('seta')}</button>
            <ul id="submenu-servicos" class="nav__sub">
              ${subs}
            </ul>
          </li>`;
    })
    .join('\n');
}

const cabecalho = (raiz, atual) =>
  render(modelo('header'), {
    raiz,
    logoAlt: c.ui.logoAlt,
    nomeEmpresa: emp.nome,
    menu: menu(raiz, atual),
    cta: cta(raiz),
  });

const rodape = (raiz) =>
  render(modelo('footer'), {
    nomeEmpresa: emp.nome,
    enderecoCurto: emp.endereco.curto,
    pendenciaEndereco: pendencia(emp.endereco.pendencia),
    pendenciaPabx: pendencia(emp.pabx.pendencia),
    pendenciaAviso: pendencia(emp.avisoLegalPendencia),
    links: c.rodape.links.map((l) => `            <li><a href="${hrefDe(raiz, l.slug)}">${esc(l.rotulo)}</a></li>`).join('\n'),
    emailRodape: emp.emailRodape,
    whatsappUrl,
    whatsappExibicao: wa.exibicao,
    avisoLegal: emp.avisoLegal,
    // Ano de fallback para quem está sem JS; o main.js atualiza em tempo de execução.
    ano: new Date().getFullYear(),
  });

const cardServico = (raiz, s) =>
  render(modelo('card-servico'), {
    icone: icone(s.icone),
    titulo: s.menu,
    resumo: s.resumo,
    href: hrefDe(raiz, s.slug),
    saibaMais: c.ui.saibaMais,
  });
const cards = (raiz) => c.servicos.map((s) => cardServico(raiz, s).trimEnd()).join('\n');

// ---------- conteúdo por tipo de página ----------
function paginaHome(raiz) {
  const h = c.home;
  return render(modelo('home'), {
    titulo: h.titulo,
    texto1: h.texto1,
    cta: cta(raiz),
    imagem: ph(h.placeholder),
    produtosTitulo: h.produtos.titulo,
    produtosTexto: h.produtos.texto,
    categorias: h.produtos.categorias.map((t) => `          <li>${icone('check')}<span>${esc(t)}</span></li>`).join('\n'),
    servicosTitulo: h.servicos.titulo,
    cards: cards(raiz),
    diferenciaisTitulo: h.diferenciais.titulo,
    diferenciaisTexto: h.diferenciais.texto,
    diferenciais: h.diferenciais.itens
      .map((i) => `          <li>${icone(i.icone)}<span>${esc(i.titulo)}</span></li>`)
      .join('\n'),
    urlListaProdutos: hrefDe(raiz, 'lista-de-produtos-e-precos'),
    contatoTitulo: h.contatoRapido.titulo,
    contatoTexto: h.contatoRapido.texto,
    whatsappUrl,
    email: emp.emailOrcamento,
    iconeWhatsapp: icone('whatsapp'),
    iconeEmail: icone('email'),
    pendencias: h.pendencias.map(pendencia).join('\n'),
  });
}

function paginaServico(raiz, s) {
  return render(modelo('servico'), {
    titulo: s.titulo,
    destaque: s.destaque ? `          <p class="destaque">${esc(s.destaque)}</p>` : '',
    paragrafos: paragrafos(s.paragrafos),
    lista: s.lista
      ? `          <ul class="lista-check">\n${s.lista.map((t) => `            <li>${icone('check')}<span>${esc(t)}</span></li>`).join('\n')}\n          </ul>`
      : '',
    cta: cta(raiz),
    imagem: ph(s.placeholder),
    outrosTitulo: c.ui.outrosServicos,
    outros: c.servicos
      .filter((o) => o.slug !== s.slug)
      .map((o) => `          <li><a href="${hrefDe(raiz, o.slug)}">${icone(o.icone)}<span>${esc(o.menu)}</span></a></li>`)
      .join('\n'),
  });
}

function campoForm(f) {
  const obrig = f.obrigatorio ? ' required aria-required="true"' : '';
  const comum = `id="${f.id}" name="${f.id}" data-rotulo="${esc(f.rotulo)}" autocomplete="${f.autocomplete}" aria-describedby="erro-${f.id}"${obrig}`;
  const controle =
    f.tipo === 'textarea'
      ? `<textarea ${comum} rows="5"></textarea>`
      : `<input ${comum} type="${f.tipo}">`;
  return `            <div class="campo">
              <label for="${f.id}">${esc(f.rotulo)}${f.obrigatorio ? ' <span aria-hidden="true">*</span>' : ''}</label>
              ${controle}
              <p class="campo__erro" id="erro-${f.id}" aria-live="polite"></p>
            </div>`;
}

function paginaContato(raiz, p) {
  const f = p.formulario;
  return render(modelo('contato'), {
    titulo: p.titulo,
    iconeWhatsapp: icone('whatsapp'),
    iconeEmail: icone('email'),
    iconeLocal: icone('local'),
    whatsappUrl,
    whatsappExibicao: wa.exibicao,
    whatsappNumero: wa.numero,
    whatsappMensagem: wa.mensagem,
    email: emp.emailOrcamento,
    endereco: emp.endereco.curto,
    pendenciasContato: pendencia(emp.pabx.pendencia) + pendencia(emp.endereco.pendencia),
    formTitulo: f.titulo,
    campos: f.campos.map(campoForm).join('\n'),
    botaoWhatsapp: f.botaoWhatsapp,
    botaoEmail: f.botaoEmail,
    pendenciasForm: p.pendencias.map(pendencia).join('\n'),
  });
}

function paginaProdutos(raiz, p) {
  const produtosData = JSON.parse(ler('src', 'data', 'produtos.json'));
  const linhasTabelaHtml = renderTabelaProdutosHtml(produtosData, p.dataExibicao || '30/08/2026');
  return render(modelo('produtos'), {
    titulo: p.titulo,
    seloData: p.seloData,
    heroApoio: p.heroApoio,
    paragrafosHtml: paragrafos(p.paragrafos, 'lead'),
    comoComprarTitulo: p.comoComprar.titulo,
    buscaRotulo: p.busca.rotulo,
    buscaPlaceholder: p.busca.placeholder,
    linhasTabelaHtml,
    urlContato: hrefDe(raiz, 'contacto'),
    whatsappUrl,
    iconeWhatsapp: icone('whatsapp'),
    avisoLegal: p.avisoLegal,
    ctaNaoEncontrouTitulo: p.ctaNaoEncontrou.titulo,
    ctaNaoEncontrouTexto: p.ctaNaoEncontrou.texto,
    ctaNaoEncontrouBtnWa: p.ctaNaoEncontrou.botaoWhatsapp,
    ctaNaoEncontrouBtnContato: p.ctaNaoEncontrou.botaoContato,
  });
}

function paginaSimples(raiz, p) {
  const corpo = [paragrafos(p.paragrafos, 'lead')];
  // Enquanto só houver TODOs, mostra o aviso neutro (permitido como texto de interface).
  if (p.paragrafos.every(ehPendencia)) corpo.push(`<p class="lead">${esc(c.paginas['em-breve'])}</p>`);
  return render(modelo('simples'), { titulo: p.titulo, corpo: corpo.filter(Boolean).join('\n'), cta: cta(raiz), imagem: ph(p.placeholder) });
}

// ---------- definição das páginas ----------
const paginas = [
  { slug: '', depth: 0, atual: '', seo: c.home, classe: 'pagina-home', corpo: (r) => paginaHome(r), jsonld: true },
  ...['quienes-somos', 'parcerias'].map((slug) => ({
    slug, depth: 1, atual: slug, seo: c.paginas[slug], classe: 'pagina-interna', corpo: (r) => paginaSimples(r, c.paginas[slug]),
  })),
  { slug: 'lista-de-produtos-e-precos', depth: 1, atual: 'lista-de-produtos-e-precos', seo: c.paginas['lista-de-produtos-e-precos'], classe: 'pagina-interna', corpo: (r) => paginaProdutos(r, c.paginas['lista-de-produtos-e-precos']) },
  { slug: 'nossos-servicos', depth: 1, atual: 'nossos-servicos', seo: c.paginas['nossos-servicos'], classe: 'pagina-interna', corpo: (r) => render(modelo('servicos-indice'), { titulo: c.paginas['nossos-servicos'].titulo, cards: cards(r) }) },
  ...c.servicos.map((s) => ({ slug: s.slug, depth: 1, atual: s.slug, seo: s, classe: 'pagina-interna', corpo: (r) => paginaServico(r, s) })),
  { slug: 'contacto', depth: 1, atual: 'contacto', seo: c.paginas.contacto, classe: 'pagina-interna', corpo: (r) => paginaContato(r, c.paginas.contacto) },
];

const jsonLd = () =>
  `<script type="application/ld+json">${JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: emp.nome,
      alternateName: emp.nomeAlternativo,
      url: base,
      email: emp.emailOrcamento,
      telephone: `+${wa.numero}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: emp.endereco.logradouro,
        addressLocality: emp.endereco.cidade,
        addressRegion: emp.endereco.uf,
        addressCountry: 'BR',
      },
    },
    null,
    2,
  )}</script>`;

function montar({ slug, raiz, atual, seo, classe, corpo, jsonld, noindex, canonical }) {
  const titulo = seo.seoTitulo;
  const descricao = seo.seoDescricao;
  const robots = noindex || !c.indexavel ? '<meta name="robots" content="noindex">' : '';
  return render(modelo('layout'), {
    idioma: c.seo.idioma,
    titulo,
    descricao,
    robots,
    canonical: canonical ? `<link rel="canonical" href="${urlDe(slug)}">` : '',
    ogUrl: canonical ? `<meta property="og:url" content="${urlDe(slug)}">` : '',
    nomeEmpresa: emp.nome,
    raiz,
    jsonld: jsonld ? jsonLd() : '',
    classeCorpo: classe,
    pular: c.ui.pular,
    cabecalho: cabecalho(raiz, atual),
    conteudo: corpo(raiz),
    rodape: rodape(raiz),
    whatsappUrl,
    whatsappRotulo: c.ui.whatsappFlutuante,
    iconeWhatsapp: icone('whatsapp'),
  });
}

const escrever = (rel, texto) => {
  const destino = join(RAIZ, rel);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, texto.endsWith('\n') ? texto : texto + '\n');
};

for (const p of paginas) {
  const raiz = p.depth ? '../' : './';
  escrever(p.slug ? `${p.slug}/index.html` : 'index.html', montar({ ...p, raiz, canonical: true }));
}

// 404: o GitHub Pages a serve em qualquer profundidade de URL, então aqui
// (e somente aqui) os recursos usam o endereço absoluto definido em seo.urlBase.
{
  const p = c.paginas['404'];
  escrever('404.html', montar({
    slug: '404', raiz: base, atual: '404', seo: p, classe: 'pagina-interna', noindex: true, canonical: false,
    corpo: (r) => render(modelo('404'), { titulo: p.titulo, texto: p.texto, botao: p.botao, href: r }),
  }));
}

// sitemap.xml
const urls = paginas.map((p) => `  <url><loc>${urlDe(p.slug)}</loc></url>`).join('\n');
escrever('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);

// robots.txt (modo teste = bloqueia tudo)
escrever('robots.txt', c.indexavel
  ? `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml`
  : 'User-agent: *\nDisallow: /');

// Relatório automático da lista de produtos e pendências para o cliente
gerarRelatorioProdutos();

console.log(`Build ok: ${paginas.length} páginas + 404.html | indexável: ${c.indexavel} | pendências visíveis: ${c.mostrarPendencias}`);
