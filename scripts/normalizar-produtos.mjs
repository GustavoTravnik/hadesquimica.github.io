import fs from 'fs';
import path from 'path';

export function normalizarProdutos() {
  const ROOT = process.cwd();
  const RAW_PATH = path.join(ROOT, 'src', 'data', 'produtos-raw.txt');
  const REF_PATH = path.join(ROOT, 'src', 'data', 'produtos-referencia.json');
  const ACENTOS_PATH = path.join(ROOT, 'scripts', 'acentos.json');
  const CONTENT_PATH = path.join(ROOT, 'src', 'content.json');
  const OUT_DATA_PATH = path.join(ROOT, 'src', 'data', 'produtos.json');
  const OUT_ASSETS_PATH = path.join(ROOT, 'assets', 'data', 'produtos.json');

  const rawLines = fs.readFileSync(RAW_PATH, 'utf8').split(/\r?\n/).filter(l => l.trim().length > 0);
  const refData = JSON.parse(fs.readFileSync(REF_PATH, 'utf8'));
  const acentos = JSON.parse(fs.readFileSync(ACENTOS_PATH, 'utf8'));
  const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'));

  const dataAtualizacao = content.paginas?.['lista-de-produtos-e-precos']?.dataAtualizacao || "2026-08-30";

  const siglas = new Set([
    'ACS', 'USP', 'DMF', 'DMSO', 'THF', 'MEK', 'TCCA', 'TBAB', 'DDQ', 'HMTA', 'P2NP', 'CAS', 'ISO', 'MESH'
  ]);

  const romanos = new Set(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']);

  const minusculas = new Set([
    'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'para', 'na', 'no', 'com', 'a'
  ]);

  function padronizarEmbalagem(emb) {
    let s = emb.trim();
    if (/^0*1\s*(?:litro|l)$/i.test(s)) return '1 L';
    const mlMatch = s.match(/^(\d+)\s*(?:ml|mL)$/i);
    if (mlMatch) return parseInt(mlMatch[1], 10) + ' mL';
    const gMatch = s.match(/^(\d+)\s*(?:grs?\.?|g)$/i);
    if (gMatch) return parseInt(gMatch[1], 10) + ' g';
    return s;
  }

  function removerGrauFinal(nome, grau) {
    if (!grau) return nome;
    const regexFim = /(?:[\s\-_]+)(?:PA\s+ACS\s+ISO|P\.A\.?\s*ACS\s+ISO|PA\s+ACS|P\.A\.?\s*ACS|PA|P\.A\.?|PS|P\.S\.?|GRAU\s+USP|Grau\s+USP|PURO|PURA|P\.URO)$/i;
    if (regexFim.test(nome)) {
      return nome.replace(regexFim, '').trim();
    }
    return nome;
  }

  const palavrasAcentuadasRastreadas = new Map();

  function formatarTermo(token, isFirst) {
    if (/^(?:PA|P\.A\.?|PS|P\.S\.?)$/i.test(token)) {
      return token.toUpperCase();
    }
    if (/^\d*H2O$/i.test(token)) {
      return token.toUpperCase();
    }
    if (romanos.has(token.toUpperCase())) {
      return token.toUpperCase();
    }
    if (siglas.has(token.toUpperCase())) {
      return token.toUpperCase();
    }
    if (/^[DL]\(\+\)$/i.test(token) || /^\([DL]\)$/i.test(token)) {
      return token.toUpperCase();
    }
    if (/^\d+(?:,\d+)?%$/i.test(token) || /^\d+Vol$/i.test(token) || /^\d+\-\d+%$/i.test(token)) {
      return token;
    }
    
    if (/^(\d+['\-]?)([a-zA-Z]+)$/i.test(token)) {
      const m = token.match(/^(\d+['\-]?)([a-zA-Z]+)$/i);
      const prefixo = m[1];
      const resto = m[2];
      const restoFormatado = formatarTermo(resto, false);
      return prefixo + restoFormatado;
    }

    const limpa = token.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let palavra = token.toLowerCase();
    if (acentos[limpa]) {
      palavra = acentos[limpa];
      if (token.toLowerCase() !== palavra) {
        palavrasAcentuadasRastreadas.set(token.toLowerCase(), palavra);
      }
    }

    if (!isFirst && minusculas.has(palavra.toLowerCase())) {
      return palavra.toLowerCase();
    }

    if (isFirst) {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    } else {
      return palavra.toLowerCase();
    }
  }

  function formatarNome(nomeOriginal, grau) {
    let nomeLimpo = removerGrauFinal(nomeOriginal, grau);
    nomeLimpo = nomeLimpo.replace(/\s+/g, ' ').trim();
    
    const partes = nomeLimpo.split(/([\s\(\)\/\-]+)/);
    let isFirstWord = true;
    
    const res = partes.map((parte) => {
      if (!parte || /^[\s\(\)\/\-]+$/.test(parte)) {
        return parte;
      }
      const formatado = formatarTermo(parte, isFirstWord);
      isFirstWord = false;
      return formatado;
    }).join('');
    
    return res;
  }

  const itensFinal = [];
  const relatorioMudancasNomes = [];

  for (let i = 0; i < refData.itens.length; i++) {
    const ref = refData.itens[i];
    const rawLinha = rawLines[i];
    
    const nomeExibido = formatarNome(ref.nomeBruto, ref.grau);
    
    const variantesFormatadas = ref.variantes.map(v => ({
      embalagem: padronizarEmbalagem(v.embalagem),
      preco: Number(v.preco)
    }));

    const itemObj = {
      id: ref.id,
      nome: nomeExibido,
      grau: ref.grau,
      variantes: variantesFormatadas,
      original: rawLinha,
      controlado: null
    };

    itensFinal.push(itemObj);

    relatorioMudancasNomes.push({
      linha: i + 1,
      original: ref.nomeBruto,
      exibido: nomeExibido,
      grau: ref.grau
    });
  }

  const outputData = {
    atualizadoEm: dataAtualizacao,
    moeda: "BRL",
    itens: itensFinal
  };

  fs.writeFileSync(OUT_DATA_PATH, JSON.stringify(outputData, null, 2) + '\n', 'utf8');

  const assetsDataDir = path.dirname(OUT_ASSETS_PATH);
  if (!fs.existsSync(assetsDataDir)) {
    fs.mkdirSync(assetsDataDir, { recursive: true });
  }
  fs.writeFileSync(OUT_ASSETS_PATH, JSON.stringify(outputData, null, 2) + '\n', 'utf8');

  return { itensFinal, outputData, palavrasAcentuadasRastreadas };
}

if (process.argv[1] && process.argv[1].endsWith('normalizar-produtos.mjs')) {
  normalizarProdutos();
  console.log('Normalização executada diretamente.');
}
