import fs from 'fs';
import path from 'path';

export function gerarRelatorioProdutos() {
  const ROOT = process.cwd();
  const PRODUTOS_PATH = path.join(ROOT, 'src', 'data', 'produtos.json');
  const ACENTOS_PATH = path.join(ROOT, 'scripts', 'acentos.json');
  const DOCS_DIR = path.join(ROOT, 'docs');
  const OUT_RELATORIO = path.join(DOCS_DIR, 'relatorio-produtos.md');

  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }

  const produtosData = JSON.parse(fs.readFileSync(PRODUTOS_PATH, 'utf8'));
  const acentos = JSON.parse(fs.readFileSync(ACENTOS_PATH, 'utf8'));

  const semGrau = produtosData.itens.filter(i => i.grau === null);

  // Identificar quais palavras do acentos.json foram realmente usadas nos itens
  const palavrasUsadas = new Map();
  for (const item of produtosData.itens) {
    const tokens = item.nome.toLowerCase().replace(/[^a-z0-9áàâãéêíóôõúç\s]/g, ' ').split(/\s+/);
    for (const t of tokens) {
      const semAc = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (acentos[semAc] && acentos[semAc] !== semAc) {
        palavrasUsadas.set(semAc, acentos[semAc]);
      }
    }
  }

  // Lista de normalizações antes -> depois
  const mudancasNomes = produtosData.itens.map((item, idx) => ({
    linha: idx + 1,
    original: item.original,
    nomeExibido: item.nome,
    grau: item.grau || '—',
    variantes: item.variantes.map(v => `${v.embalagem} (${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v.preco)})`).join(' // ')
  }));

  const markdown = `# Relatório de Auditoria e Normalização da Relação de Produtos e Preços

> **Data de geração:** ${new Date().toISOString().split('T')[0]}  
> **Base de dados:** \`src/data/produtos.json\` (derivado de \`src/data/produtos-raw.txt\`)  
> **Total de itens:** ${produtosData.itens.length}  
> **Total de variantes de embalagem/preço:** ${produtosData.itens.reduce((acc, i) => acc + i.variantes.length, 0)}  
> **Data de atualização da relação na origem:** ${produtosData.atualizadoEm}  

---

## 8.1 Inconsistências de dados encontradas (confirmar com o cliente)

As seguintes inconsistências de digitação e formatação foram identificadas no arquivo de origem bruto (\`produtos-raw.txt\`). Em respeito à regra de ouro do projeto, **nenhum dado foi alterado ou corrigido arbitrariamente no site**. As decisões cabem exclusivamente ao cliente:

1. **\`ÁCIDO ACÉTICO GLACIAL NA CONCENTRAÇÃO DE 30%\` (Linha 15, 1 L, R$ 99,00):**  
   O termo "glacial" na química industrial e analítica designa especificamente a forma anidra/pura (~99,8%). A concentração de 30% é incompatível com o estado glacial. **Confirmar se o produto é Ácido Acético 30% ou Ácido Acético Glacial 99,8%.**

2. **\`GLICINA PA ACS (ÁCIDO AMINO ACÉTICO) 250ml\` (Linha 192, R$ 99,00):**  
   A glicina é um aminoácido sólido cristalino à temperatura ambiente, rotineiramente comercializado em gramas (g). No arquivo bruto está cotado em \`250ml\`. **Confirmar se a embalagem correta é 250 g.**

3. **\`MOLIBDATO DE "AMONEO" (4H2O)\` (Linha 231, 50 g, R$ 129,00):**  
   Grafia no texto bruto: "AMONEO". Trata-se de provável erro de digitação para "amônio". Conforme regra de ouro, o dicionário mecânico **não** alterou essa palavra, preservando o nome original até confirmação do cliente.

4. **Preços sem prefixo "R$" ou com formatação atípica na origem:**  
   - Linha 16 (\`ÁCIDO ACÉTICO GLACIAL P.A ACS 99,8%\`): cotado como \`$129,00\` (sem o "R").  
   - Linha 264 (\`PERCLORATO DE POTÁSSIO P.A\`): cotado como \`299,00\` (sem "R$").  
   - Linha 291 (\`SULFATO DE SODIO ANIDRO PA ACS\`): sem os três asteriscos de separador (\`500grsR$ 49,00\`).  
   *Nota técnica:* Todos os valores numéricos foram extraídos com precisão e conferidos.

5. **\`4'METIL PROPIOFENONA\` (Linha 228, 200 mL, R$ 299,00):**  
   Havia um espaço em branco inicial na linha de origem. O espaço foi removido mecanicamente sem afetar a nomenclatura.

6. **17 itens sem indicação de grau químico na fonte:**  
   Os seguintes itens não possuem especificação de pureza (P.A., P.S., Puro, USP, etc.) no texto de origem:
${semGrau.map(i => `   - **Linha ${produtosData.itens.indexOf(i) + 1}:** \`${i.nome}\` (${i.variantes.map(v => v.embalagem).join(', ')})`).join('\n')}

---

## 8.2 Pontos jurídicos e comerciais a validar antes de publicar

Antes da publicação em produção no domínio oficial, os seguintes pontos devem ser validados formalmente pelo setor jurídico e comercial do cliente:

1. **Produtos Químicos Sujeitos a Controle Legal:**  
   A relação inclui reagentes de controle especial (Polícia Federal, Exército Brasileiro e/ou ANVISA), tais como solventes controlados, precursores, oxidantes e ácidos concentrados (ex.: ácido sulfúrico, ácido clorídrico, permanganato de potássio, éter etílico, acetona, cloroformio, anidrido acético, etc.).  
   - *Ação requerida:* O cliente deve fornecer a lista oficial de quais produtos exigem Certificado de Registro / Licença de Funcionamento para que o campo reservado \`controlado\` seja preenchido e as instruções legais sejam adequadamente exibidas. **Nenhum produto foi marcado como controlado por inferência da equipe de desenvolvimento.**

2. **Citação nominal de fornecedores e marcas:**  
   O texto institucional da página menciona nominalmente "grandes fornecedores nacionais, tais como Neon, Dinâmica Química, Êxodo Científica, Merck e Sigma Aldrich".  
   - *Ação requerida:* Confirmar com o jurídico se há autorização contratual para o uso dessas marcas comerciais no site público da empresa.

3. **Afirmação "mais de 10 mil reagentes":**  
   O texto afirma que a empresa trabalha com "mais de 10 mil reagentes químicos".  
   - *Ação requerida:* Confirmar a veracidade comercial da alegação perante as diretrizes do Código de Defesa do Consumidor.

4. **Menção a "juros baixos cobrados pelo Mercado Pago":**  
   O bloco "Como comprar" afirma "parcelado em até 12x com juros baixos cobrados pelo Mercado Pago".  
   - *Ação requerida:* O adjetivo "baixos" é subjetivo e pode ser questionado. Recomenda-se confirmar se o termo pode permanecer ou se deve ser ajustado para "juros da operadora Mercado Pago".

5. **Vigência da relação de preços (Data: 30/08/2026):**  
   A data constante na relação oficial é de **30/08/2026**. Se essa data tiver mais de 60 dias da data de publicação efetiva, o cliente deve confirmar se os valores permanecem vigentes ou enviar relação atualizada.

6. **Política de Privacidade e LGPD no canal WhatsApp:**  
   Como todas as compras e cotações são direcionadas para o WhatsApp, é fundamental disponibilizar a Política de Privacidade informando a finalidade do tratamento de dados cadastrais e fiscais coletados durante o atendimento.

---

## 8.3 Relatório de Normalização Mecânica

### Palavras acentuadas via dicionário determinístico (\`scripts/acentos.json\`)
Total de termos acentuados identificados no catálogo: **${palavrasUsadas.size}**

| Termo sem acento (origem) | Termo acentuado aplicado |
|---|---|
${Array.from(palavrasUsadas.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([sem, com]) => `| \`${sem}\` | **\`${com}\`** |`).join('\n')}

### Lista completa de transformação de nomes (312 itens)

| Linha | Nome Bruto na Fonte | Nome Exibido no Site | Grau | Embalagem e Preço |
|---|---|---|---|---|
${mudancasNomes.map(m => `| ${m.linha} | \`${m.original}\` | **${m.nomeExibido}** | ${m.grau} | ${m.variantes} |`).join('\n')}
`;

  fs.writeFileSync(OUT_RELATORIO, markdown, 'utf8');
  console.log(`Relatório de produtos gerado com sucesso em: ${OUT_RELATORIO}`);
}

if (process.argv[1] && process.argv[1].endsWith('gerar-relatorio.mjs')) {
  gerarRelatorioProdutos();
}
