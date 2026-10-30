// Servidor estático local (sem dependências). Porta 8080 (ou PORT).
// Serve o site na raiz (http://localhost:8080/) e também em subpasta
// (http://localhost:8080/hadesquimica.github.io/) para simular o GitHub Pages do projeto.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORTA = Number(process.env.PORT) || 8080;
const SUBPASTA = '/hadesquimica.github.io';
const BLOQUEADOS = new Set(['src', 'scripts', 'node_modules', '.git']);
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.ico': 'image/x-icon',
};

async function arquivoPara(caminhoUrl) {
  let rel = decodeURIComponent(caminhoUrl.split('?')[0]);
  if (rel === SUBPASTA) return { redirecionar: `${SUBPASTA}/` };
  if (rel.startsWith(`${SUBPASTA}/`)) rel = rel.slice(SUBPASTA.length);
  let alvo = resolve(join(RAIZ, rel));
  if (alvo !== RAIZ && !alvo.startsWith(RAIZ + sep)) return null;
  if (BLOQUEADOS.has(alvo.slice(RAIZ.length + 1).split(sep)[0])) return null;
  try {
    const info = await stat(alvo);
    if (info.isDirectory()) {
      if (!rel.endsWith('/')) return { redirecionar: `${caminhoUrl.split('?')[0]}/` };
      alvo = join(alvo, 'index.html');
    }
    return { alvo, dados: await readFile(alvo) };
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const r = await arquivoPara(req.url);
  if (r?.redirecionar) {
    res.writeHead(301, { Location: r.redirecionar }).end();
  } else if (r) {
    res.writeHead(200, { 'Content-Type': TIPOS[extname(r.alvo)] || 'application/octet-stream' }).end(r.dados);
  } else {
    const nf = await readFile(join(RAIZ, '404.html')).catch(() => 'Não encontrado');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(nf);
  }
}).listen(PORTA, () => {
  console.log(`Site local:  http://localhost:${PORTA}/`);
  console.log(`Subpasta:    http://localhost:${PORTA}${SUBPASTA}/`);
});
