import fs from 'fs';
import path from 'path';

export function renderTabelaProdutosHtml(produtosData, dataExibicao) {
  const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function normalizarTextoBusca(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function obterTipoEmbalagem(variantes) {
    const tipos = new Set();
    for (const v of variantes) {
      if (/g$/i.test(v.embalagem.trim())) tipos.add('solido');
      if (/(?:ml|l)$/i.test(v.embalagem.trim())) tipos.add('liquido');
    }
    if (tipos.has('solido') && tipos.has('liquido')) return 'misto';
    if (tipos.has('solido')) return 'solido';
    if (tipos.has('liquido')) return 'liquido';
    return 'outro';
  }

  function criarUrlWhatsapp(item, variante) {
    const grauTexto = item.grau ? ` (${item.grau})` : '';
    const precoFormatado = formatadorMoeda.format(variante.preco);
    const msg = `Olá, gostaria de um orçamento: ${item.nome}${grauTexto} – ${variante.embalagem} – ${precoFormatado} (relação de ${dataExibicao}).`;
    return `https://api.whatsapp.com/send?phone=5561984241187&text=${encodeURIComponent(msg)}`;
  }

  const linhasHtml = produtosData.itens.map((item, idx) => {
    const tipo = obterTipoEmbalagem(item.variantes);
    const menorPreco = Math.min(...item.variantes.map(v => v.preco));
    const maiorPreco = Math.max(...item.variantes.map(v => v.preco));
    const primeiraLetra = item.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0).toUpperCase();
    const buscaStr = normalizarTextoBusca(`${item.nome} ${item.grau || ''} ${item.variantes.map(v => v.embalagem).join(' ')}`);

    const celulaVariantes = item.variantes.map((v, vIdx) => {
      const precoFmt = formatadorMoeda.format(v.preco);
      const waUrl = criarUrlWhatsapp(item, v);
      return `
        <div class="variante-linha">
          <span class="variante-embalagem">${v.embalagem}</span>
          <span class="variante-separador">·</span>
          <span class="variante-preco">${precoFmt}</span>
          <a class="btn-wa-item" href="${waUrl}" target="_blank" rel="noopener" aria-label="Consultar no WhatsApp: ${item.nome} ${v.embalagem} por ${precoFmt}">
            <svg class="icone-wa" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.78 14.07c-.24.68-1.2 1.25-1.72 1.3-.47.05-1.07.07-3.14-.77-2.65-1.08-4.35-3.79-4.48-3.97-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .36 0 .51.01.17.01.39-.06.61.46.24.57.81 1.98.88 2.13.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.45.54-.15.15-.31.32-.13.62.18.3 1.05 1.73 2.26 2.81 1.55 1.38 2.86 1.81 3.27 2.01.41.2.66.18.91-.11.25-.29 1.07-1.25 1.36-1.68.29-.43.58-.36.97-.22.39.14 2.48 1.17 2.91 1.38.43.21.71.31.81.49.1.18.1.98-.14 1.66z"/></svg>
            <span>Consultar no WhatsApp</span>
          </a>
        </div>
      `;
    }).join('\n');

    const grauBadge = item.grau 
      ? `<span class="badge badge--grau badge--${item.grau.toLowerCase().replace(/[^a-z0-9]/g, '-')}">${item.grau}</span>` 
      : `<span class="badge badge--sem-grau">Sem grau informado</span>`;

    return `
      <tr class="linha-produto" id="p-${item.id}"
          data-id="${item.id}"
          data-nome="${buscaStr}"
          data-nome-exibido="${item.nome}"
          data-grau="${item.grau || 'sem-grau'}"
          data-tipo="${tipo}"
          data-preco-min="${menorPreco}"
          data-preco-max="${maiorPreco}"
          data-letra="${primeiraLetra}">
        <td class="col-nome">
          <div class="produto-nome">${item.nome}</div>
        </td>
        <td class="col-grau">
          ${grauBadge}
        </td>
        <td class="col-variantes" colspan="3">
          <div class="variantes-container">
            ${celulaVariantes}
          </div>
        </td>
      </tr>
    `;
  }).join('\n');

  return linhasHtml;
}
