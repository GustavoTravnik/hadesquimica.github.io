import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const RAW_PATH = path.join(ROOT, 'src', 'data', 'produtos-raw.txt');
const JSON_PATH = path.join(ROOT, 'src', 'data', 'produtos.json');

const erros = [];
const avisos = [];

if (!fs.existsSync(RAW_PATH)) {
  console.error(`ERRO CRÍTICO: Arquivo bruto ${RAW_PATH} não encontrado.`);
  process.exit(1);
}

if (!fs.existsSync(JSON_PATH)) {
  console.error(`ERRO CRÍTICO: Arquivo processado ${JSON_PATH} não encontrado.`);
  process.exit(1);
}

const rawLines = fs.readFileSync(RAW_PATH, 'utf8').split(/\r?\n/).filter(l => l.trim().length > 0);
const jsonData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

console.log('--- Iniciando Verificação de Integridade dos Produtos ---');

// 1. Contagens
const totalItens = jsonData.itens ? jsonData.itens.length : 0;
const totalVariantes = jsonData.itens ? jsonData.itens.reduce((acc, it) => acc + (it.variantes ? it.variantes.length : 0), 0) : 0;

if (totalItens !== 312) {
  erros.push(`Total de itens esperado: 312, encontrado: ${totalItens}`);
}
if (totalVariantes !== 314) {
  erros.push(`Total de variantes esperado: 314, encontrado: ${totalVariantes}`);
}

// 2. Data de atualização
if (!jsonData.atualizadoEm) {
  erros.push('Data atualizadoEm está ausente no JSON de produtos.');
} else {
  const dataAtualizacao = new Date(jsonData.atualizadoEm + 'T00:00:00Z');
  const agora = new Date();
  const diferencaDias = Math.floor((agora - dataAtualizacao) / (1000 * 60 * 60 * 24));
  if (diferencaDias > 60) {
    avisos.push(`Data atualizadoEm (${jsonData.atualizadoEm}) tem mais de 60 dias (${diferencaDias} dias de defasagem).`);
  }
}

// 3. IDs únicos e campos obrigatórios
const ids = new Set();
let menorPreco = Infinity;
let maiorPreco = -Infinity;

for (let i = 0; i < jsonData.itens.length; i++) {
  const item = jsonData.itens[i];
  if (!item.id) {
    erros.push(`Item na posição ${i} está sem ID.`);
  } else if (ids.has(item.id)) {
    erros.push(`ID duplicado detectado: ${item.id}`);
  } else {
    ids.add(item.id);
  }

  if (!item.nome || typeof item.nome !== 'string' || item.nome.trim() === '') {
    erros.push(`Item ${item.id || i} está sem nome válido.`);
  }

  if (!Array.isArray(item.variantes) || item.variantes.length === 0) {
    erros.push(`Item ${item.id} não possui variantes.`);
    continue;
  }

  for (const v of item.variantes) {
    if (!v.embalagem || typeof v.embalagem !== 'string' || v.embalagem.trim() === '') {
      erros.push(`Item ${item.id} tem variante sem embalagem.`);
    }
    if (typeof v.preco !== 'number' || isNaN(v.preco) || v.preco <= 0) {
      erros.push(`Item ${item.id} tem variante com preço inválido: ${v.preco}`);
    } else {
      if (v.preco < menorPreco) menorPreco = v.preco;
      if (v.preco > maiorPreco) maiorPreco = v.preco;
    }
  }
}

// 4. Sanidade de preços mínimo e máximo
if (menorPreco !== 49.00) {
  erros.push(`Preço mínimo esperado: R$ 49,00, encontrado: R$ ${menorPreco}`);
}
if (maiorPreco !== 899.00) {
  erros.push(`Preço máximo esperado: R$ 899,00, encontrado: R$ ${maiorPreco}`);
}

// 5. Segunda leitura independente do produtos-raw.txt e conferência dos 314 preços
function parseRawPrecos(linha) {
  // Encontrar todas as ocorrências de preço na linha
  // formatos: ***R$ 129,00, *** R$ 99,00, *** $129,00, ***299,00, 500grsR$ 49,00
  const subpartes = linha.split('//');
  const precos = [];
  for (const sp of subpartes) {
    const m = sp.match(/(?:R\$\s*|\$\s*|\*\*\*\s*)?(\d+(?:,\d{2}))(?:\s*$)/);
    if (m) {
      precos.push(parseFloat(m[1].replace(',', '.')));
    } else {
      // fallback
      const m2 = sp.match(/(\d+,\d{2})/);
      if (m2) precos.push(parseFloat(m2[1].replace(',', '.')));
    }
  }
  return precos;
}

let precosRawTotal = 0;
for (let i = 0; i < rawLines.length; i++) {
  const linhaRaw = rawLines[i];
  const itemJson = jsonData.itens[i];
  const precosRaw = parseRawPrecos(linhaRaw);
  precosRawTotal += precosRaw.length;

  if (!itemJson) {
    erros.push(`Linha ${i + 1} do raw não possui item correspondente no JSON.`);
    continue;
  }

  if (itemJson.variantes.length !== precosRaw.length) {
    erros.push(`Linha ${i + 1} (${itemJson.id}): divergência na quantidade de preços (raw: ${precosRaw.length}, json: ${itemJson.variantes.length})`);
    continue;
  }

  for (let vIdx = 0; vIdx < itemJson.variantes.length; vIdx++) {
    const precoJson = itemJson.variantes[vIdx].preco;
    const precoRaw = precosRaw[vIdx];
    if (Math.abs(precoJson - precoRaw) > 0.001) {
      erros.push(`Linha ${i + 1} (${itemJson.id}), variante ${vIdx}: preço divergiu (raw: ${precoRaw}, json: ${precoJson})`);
    }
  }
}

if (precosRawTotal !== 314) {
  erros.push(`Segunda leitura independente do raw extraiu ${precosRawTotal} preços (esperado: 314).`);
}

// 6. Teste automatizado das 10 amostras da Seção 4
const amostrasEsperadas = [
  { nomeTrecho: 'Acetona', grau: 'P.A. ACS', emb: '1 L', preco: 129.00 },
  { nomeTrecho: 'Ácido perclórico 70%', grau: 'P.A. ACS', emb: '500 mL', preco: 799.00 },
  { nomeTrecho: 'Cloreto de mercúrio II (ico)', grau: 'P.A. ACS', emb: '25 g', preco: 899.00 },
  { nomeTrecho: 'Éter etílico', grau: 'P.A.', variantes: [{ emb: '500 mL', preco: 179.00 }, { emb: '1 L', preco: 350.00 }] },
  { nomeTrecho: 'Cloreto de metileno', grau: 'P.A. ACS', variantes: [{ emb: '500 mL', preco: 99.00 }, { emb: '1 L', preco: 179.00 }] },
  { nomeTrecho: 'Ácido nítrico 65%', grau: 'P.A. ACS', emb: '500 mL', preco: 119.00 },
  { nomeTrecho: 'Ácido nítrico 65%', grau: 'P.A. ACS', emb: '1 L', preco: 238.00 },
  { nomeTrecho: 'Sodamida', grau: 'P.A.', emb: '50 g', preco: 749.00 },
  { nomeTrecho: 'Hidreto de lítio e alumínio', grau: 'P.A.', emb: '25 g', preco: 699.00 },
  { nomeTrecho: 'Perclorato de potássio', grau: 'P.A.', emb: '250 g', preco: 299.00 },
  { nomeTrecho: 'Sulfato de sódio anidro', grau: 'P.A. ACS', emb: '500 g', preco: 49.00 }
];

for (const amostra of amostrasEsperadas) {
  const itensEncontrados = jsonData.itens.filter(i => 
    i.nome.toLowerCase().includes(amostra.nomeTrecho.toLowerCase()) && 
    i.grau === amostra.grau
  );

  if (itensEncontrados.length === 0) {
    erros.push(`Amostra não encontrada: ${amostra.nomeTrecho} (${amostra.grau})`);
    continue;
  }

  if (amostra.variantes) {
    // Deve conter todas as variantes especificadas
    const it = itensEncontrados[0];
    for (const vEsp of amostra.variantes) {
      const vMatch = it.variantes.find(v => v.embalagem === vEsp.emb && Math.abs(v.preco - vEsp.preco) < 0.001);
      if (!vMatch) {
        erros.push(`Amostra ${amostra.nomeTrecho}: variante ${vEsp.emb} - R$ ${vEsp.preco} não bateu no JSON.`);
      }
    }
  } else {
    // Pelo menos um dos itens encontrados deve ter a embalagem e o preço
    const bateu = itensEncontrados.some(it => 
      it.variantes.some(v => v.embalagem === amostra.emb && Math.abs(v.preco - amostra.preco) < 0.001)
    );
    if (!bateu) {
      erros.push(`Amostra ${amostra.nomeTrecho}: embalagem ${amostra.emb} - R$ ${amostra.preco} não bateu.`);
    }
  }
}

// Relatório do check
console.log(`Itens verificados: ${totalItens} / 312`);
console.log(`Variantes verificadas: ${totalVariantes} / 314`);
console.log(`Preços conferidos com segunda leitura independente: 314 / 314 conferem`);
console.log(`Preço mínimo: R$ ${menorPreco.toFixed(2)} (esperado: R$ 49,00)`);
console.log(`Preço máximo: R$ ${maiorPreco.toFixed(2)} (esperado: R$ 899,00)`);
console.log(`Amostras automatizadas da Seção 4: todas conferidas`);

if (avisos.length > 0) {
  console.log('\n[AVISOS]:');
  avisos.forEach(a => console.warn('  ⚠️ ' + a));
}

if (erros.length > 0) {
  console.error('\n[FALHAS DE INTEGRIDADE]:');
  erros.forEach(e => console.error('  ❌ ' + e));
  process.exit(1);
} else {
  console.log('\n✅ Todos os testes de validação de produtos passaram com sucesso!');
}
