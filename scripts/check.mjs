// Verificações estáticas do HTML gerado (sem dependências):
// links internos quebrados, âncoras, IDs duplicados, imagens sem alt,
// <title>/<meta description> ausentes ou longos, um único <h1>, TODOs visíveis.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IGNORAR = new Set(['node_modules', '.git', 'src', 'scripts']);
const conteudo = JSON.parse(readFileSync(join(RAIZ, 'src', 'content.json'), 'utf8'));
const erros = [];
const erro = (arq, msg) => erros.push(`${arq}: ${msg}`);

function listarHtml(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (IGNORAR.has(e.name)) return [];
    const p = join(dir, e.name);
    return e.isDirectory() ? listarHtml(p) : e.name.endsWith('.html') ? [p] : [];
  });
}

const arquivos = listarHtml(RAIZ);
const ids = new Map();
for (const arq of arquivos) {
  const html = readFileSync(arq, 'utf8');
  ids.set(arq, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

for (const arq of arquivos) {
  const nome = relative(RAIZ, arq).split(sep).join('/');
  const html = readFileSync(arq, 'utf8');

  // IDs duplicados
  const todos = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  todos.filter((id, i) => todos.indexOf(id) !== i).forEach((id) => erro(nome, `id duplicado "${id}"`));

  // título e descrição
  const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!titulo) erro(nome, 'sem <title>');
  else if (titulo.length > 60) erro(nome, `<title> com ${titulo.length} caracteres (máx. 60)`);
  if (!desc) erro(nome, 'sem meta description');
  else if (desc.length > 155) erro(nome, `description com ${desc.length} caracteres (máx. 155)`);

  // um único h1
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) erro(nome, `${h1} elementos <h1> (esperado 1)`);

  // imagens sem alt / placeholders sem aria-label
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) erro(nome, `<img> sem alt: ${m[0]}`);
  for (const m of html.matchAll(/<div class="ph"[^>]*>/g)) if (!/aria-label="[^"]+"/.test(m[0])) erro(nome, 'placeholder sem aria-label');

  // TODO visível
  if (!conteudo.mostrarPendencias && /\bTODO\b/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) erro(nome, 'texto TODO visível com mostrarPendencias=false');

  // links e recursos internos
  for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    const ref = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    if (/^\//.test(ref)) { erro(nome, `caminho absoluto "${ref}" (use caminhos relativos)`); continue; }
    const [semHash, hash] = [ref.split('#')[0].split('?')[0], ref.includes('#') ? ref.split('#')[1] : ''];
    let alvo = semHash ? resolve(dirname(arq), semHash) : arq;
    if (existsSync(alvo) && statSync(alvo).isDirectory()) alvo = join(alvo, 'index.html');
    if (!existsSync(alvo)) { erro(nome, `link quebrado "${ref}"`); continue; }
    if (hash && ids.has(alvo) && !ids.get(alvo).has(hash)) erro(nome, `âncora inexistente "${ref}"`);
  }
}

// arquivos obrigatórios
for (const f of ['CNAME', '.nojekyll', 'robots.txt', 'sitemap.xml', 'favicon.svg', '404.html', 'index.html']) {
  if (!existsSync(join(RAIZ, f))) erro(f, 'arquivo obrigatório ausente');
}

if (erros.length) {
  console.error(`✖ ${erros.length} problema(s):\n` + erros.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✔ check ok: ${arquivos.length} páginas HTML verificadas.`);
