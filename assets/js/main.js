// Chemi Pharma – comportamento do site. Sem dependências.
(() => {
  'use strict';

  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 960px)');

  // ---------- Ano do rodapé ----------
  document.querySelectorAll('[data-ano]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Menu (hambúrguer + submenu) ----------
  const botaoMenu = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu-principal');
  const itensSub = [...document.querySelectorAll('.nav__item--sub')];

  const alternarSub = (item, abrir) => {
    const botao = item.querySelector('.nav__sub-botao');
    item.classList.toggle('is-aberto', abrir);
    botao.setAttribute('aria-expanded', String(abrir));
  };
  const fecharSubs = (exceto) => itensSub.forEach((i) => i !== exceto && alternarSub(i, false));
  const alternarMenu = (abrir) => {
    nav.classList.toggle('is-aberto', abrir);
    botaoMenu.setAttribute('aria-expanded', String(abrir));
    if (!abrir) fecharSubs();
  };

  if (botaoMenu && nav) {
    botaoMenu.addEventListener('click', () => alternarMenu(!nav.classList.contains('is-aberto')));
  }
  itensSub.forEach((item) => {
    const botao = item.querySelector('.nav__sub-botao');
    botao.addEventListener('click', () => {
      const abrir = !item.classList.contains('is-aberto');
      fecharSubs(item);
      alternarSub(item, abrir);
    });
    // Fecha o submenu quando o foco sai do item (navegação por Tab).
    item.addEventListener('focusout', (e) => {
      if (desktop.matches && !item.contains(e.relatedTarget)) alternarSub(item, false);
    });
  });

  // Esc fecha menu/submenu e devolve o foco ao controle que o abriu.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const subAberto = itensSub.find((i) => i.classList.contains('is-aberto'));
    if (subAberto) {
      alternarSub(subAberto, false);
      subAberto.querySelector('.nav__sub-botao').focus();
    } else if (nav && nav.classList.contains('is-aberto')) {
      alternarMenu(false);
      botaoMenu.focus();
    }
  });

  // Clique fora fecha tudo.
  document.addEventListener('click', (e) => {
    if (e.target.closest('.cabecalho')) return;
    fecharSubs();
    if (nav && nav.classList.contains('is-aberto')) alternarMenu(false);
  });

  // Ao ir para o desktop, reinicia o estado do menu móvel.
  desktop.addEventListener('change', () => nav && alternarMenu(false));

  // ---------- Rolagem suave para #âncoras (fecha o menu móvel ao navegar) ----------
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="#"]');
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const alvo = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!alvo) return;
    e.preventDefault();
    alvo.scrollIntoView({ behavior: reduzMovimento.matches ? 'auto' : 'smooth', block: 'start' });
    history.pushState(null, '', url.hash);
    if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
    alvo.focus({ preventScroll: true });
    if (nav && nav.classList.contains('is-aberto')) alternarMenu(false);
  });

  // ---------- Lista de Produtos e Preços ----------
  const tabelaProdutos = document.getElementById('tabela-produtos');
  if (tabelaProdutos) {
    const buscaInput = document.getElementById('busca-reagente');
    const btnLimparBusca = document.getElementById('btn-limpar-busca');
    const filtroGrau = document.getElementById('filtro-grau');
    const filtroEmbalagem = document.getElementById('filtro-embalagem');
    const filtroPrecoMin = document.getElementById('filtro-preco-min');
    const filtroPrecoMax = document.getElementById('filtro-preco-max');
    const ordemSelect = document.getElementById('ordem-produtos');
    const btnResetFiltros = document.getElementById('btn-reset-filtros');
    const contadorEl = document.getElementById('contador-resultados');
    const tbody = document.getElementById('tbody-produtos');
    const linhas = [...tbody.querySelectorAll('.linha-produto')];
    const semResultadosEl = document.getElementById('sem-resultados');
    const btnSemResultadosWa = document.getElementById('btn-sem-resultados-wa');
    const btnSemResultadosContato = document.getElementById('btn-sem-resultados-contato');
    const indiceAzContainer = document.getElementById('letras-az-container');
    const indiceAzNav = document.getElementById('indice-az');

    const collator = new Intl.Collator('pt-BR', { sensitivity: 'base' });
    const normalizar = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    // Renderizar letras do índice A-Z
    const letrasUnicas = new Set();
    linhas.forEach((l) => {
      const letra = l.dataset.letra;
      if (letra) letrasUnicas.add(letra);
    });
    const todasLetras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    if (indiceAzContainer) {
      todasLetras.forEach((letra) => {
        const tem = letrasUnicas.has(letra);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-letra-az';
        btn.textContent = letra;
        btn.disabled = !tem;
        btn.setAttribute('aria-label', tem ? `Ir para letra ${letra}` : `Letra ${letra} sem reagentes`);
        btn.addEventListener('click', () => {
          if (ordemSelect.value !== 'nome-asc') {
            ordemSelect.value = 'nome-asc';
            ordenarLinhas();
          }
          const primeiraLinhaLetra = linhas.find((l) => !l.classList.contains('is-hidden') && l.dataset.letra === letra);
          if (primeiraLinhaLetra) {
            primeiraLinhaLetra.scrollIntoView({ behavior: reduzMovimento.matches ? 'auto' : 'smooth', block: 'center' });
            const nomeEl = primeiraLinhaLetra.querySelector('.produto-nome');
            if (nomeEl) {
              nomeEl.setAttribute('tabindex', '-1');
              nomeEl.focus({ preventScroll: true });
            }
          }
        });
        indiceAzContainer.appendChild(btn);
      });
    }

    const ordenarLinhas = () => {
      const ordem = ordemSelect.value;
      if (indiceAzNav) {
        indiceAzNav.setAttribute('aria-disabled', ordem === 'nome-asc' ? 'false' : 'true');
      }
      linhas.sort((a, b) => {
        if (ordem === 'nome-asc') return collator.compare(a.dataset.nomeExibido, b.dataset.nomeExibido);
        if (ordem === 'nome-desc') return collator.compare(b.dataset.nomeExibido, a.dataset.nomeExibido);
        if (ordem === 'preco-asc') return Number(a.dataset.precoMin) - Number(b.dataset.precoMin);
        if (ordem === 'preco-desc') return Number(b.dataset.precoMin) - Number(a.dataset.precoMin);
        return 0;
      });
      tbody.append(...linhas);
    };

    let timerDebounce = null;
    const filtrar = () => {
      const termoBusca = normalizar(buscaInput.value);
      const termos = termoBusca ? termoBusca.split(/\s+/).filter(Boolean) : [];
      const grau = filtroGrau.value;
      const embalagem = filtroEmbalagem.value;
      const precoMin = filtroPrecoMin.value ? parseFloat(filtroPrecoMin.value) : -Infinity;
      const precoMax = filtroPrecoMax.value ? parseFloat(filtroPrecoMax.value) : Infinity;

      btnLimparBusca.hidden = termoBusca.length === 0;

      let visiveisCount = 0;

      linhas.forEach((linha) => {
        const itemNome = linha.dataset.nome;
        const itemGrau = linha.dataset.grau;
        const itemTipo = linha.dataset.tipo;
        const itemPrecoMin = parseFloat(linha.dataset.precoMin);

        // Busca
        let bateuBusca = true;
        if (termos.length > 0) {
          bateuBusca = termos.every((t) => itemNome.includes(t));
        }

        // Filtro Grau
        let bateuGrau = true;
        if (grau !== 'todos') {
          bateuGrau = (itemGrau === grau);
        }

        // Filtro Embalagem
        let bateuEmbalagem = true;
        if (embalagem === 'solido') {
          bateuEmbalagem = (itemTipo === 'solido' || itemTipo === 'misto');
        } else if (embalagem === 'liquido') {
          bateuEmbalagem = (itemTipo === 'liquido' || itemTipo === 'misto');
        }

        // Filtro Preço
        let bateuPreco = true;
        if (precoMin > -Infinity && itemPrecoMin < precoMin) bateuPreco = false;
        if (precoMax < Infinity && itemPrecoMin > precoMax) bateuPreco = false;

        const visivel = bateuBusca && bateuGrau && bateuEmbalagem && bateuPreco;
        if (visivel) {
          linha.classList.remove('is-hidden');
          linha.removeAttribute('hidden');
          visiveisCount++;
        } else {
          linha.classList.add('is-hidden');
          linha.setAttribute('hidden', '');
        }
      });

      contadorEl.textContent = `Exibindo ${visiveisCount} de ${linhas.length} reagentes`;

      if (visiveisCount === 0) {
        semResultadosEl.hidden = false;
        const termoDigitado = buscaInput.value.trim();
        const msgWa = termoDigitado
          ? `Olá, gostaria de solicitar um orçamento para o reagente: ${termoDigitado} (não encontrei na relação do site).`
          : 'Olá, gostaria de solicitar um orçamento para reagentes químicos.';
        btnSemResultadosWa.href = `https://api.whatsapp.com/send?phone=5561984241187&text=${encodeURIComponent(msgWa)}`;
        btnSemResultadosContato.href = termoDigitado
          ? `../contacto/?produto=${encodeURIComponent(termoDigitado)}`
          : '../contacto/';
      } else {
        semResultadosEl.hidden = true;
      }
    };

    buscaInput.addEventListener('input', () => {
      clearTimeout(timerDebounce);
      timerDebounce = setTimeout(filtrar, 120);
    });

    btnLimparBusca.addEventListener('click', () => {
      buscaInput.value = '';
      filtrar();
      buscaInput.focus();
    });

    filtroGrau.addEventListener('change', filtrar);
    filtroEmbalagem.addEventListener('change', filtrar);
    filtroPrecoMin.addEventListener('input', () => {
      clearTimeout(timerDebounce);
      timerDebounce = setTimeout(filtrar, 200);
    });
    filtroPrecoMax.addEventListener('input', () => {
      clearTimeout(timerDebounce);
      timerDebounce = setTimeout(filtrar, 200);
    });

    ordemSelect.addEventListener('change', () => {
      ordenarLinhas();
      filtrar();
    });

    btnResetFiltros.addEventListener('click', () => {
      buscaInput.value = '';
      filtroGrau.value = 'todos';
      filtroEmbalagem.value = 'todos';
      filtroPrecoMin.value = '';
      filtroPrecoMax.value = '';
      ordemSelect.value = 'nome-asc';
      ordenarLinhas();
      filtrar();
      buscaInput.focus();
    });

    // Ler ?q= ou ?produto= da URL
    const urlParams = new URLSearchParams(window.location.search);
    const termoInicial = urlParams.get('q') || urlParams.get('produto');
    if (termoInicial) {
      buscaInput.value = termoInicial;
    }
    ordenarLinhas();
    filtrar();
  }

  // ---------- Formulário de orçamento ----------
  const form = document.getElementById('form-orcamento');
  if (!form) return;

  /*
   * Envio sem servidor: o formulário monta uma mensagem e abre o WhatsApp ou o
   * cliente de e-mail do visitante. Nada é enviado a terceiros.
   * Para receber os pedidos automaticamente (ex.: Formspree), troque o `action`
   * do <form> pela URL do serviço, use method="post" e remova os handlers de
   * "mailto"/WhatsApp abaixo (mantendo a validação). Só faça isso com autorização
   * do cliente, pois os dados passam a trafegar por um serviço de terceiros.
   */
  const campos = [...form.elements].filter((el) => el.name);
  const status = document.getElementById('form-status');
  const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  const definirErro = (campo, msg) => {
    document.getElementById(`erro-${campo.id}`).textContent = msg;
    if (msg) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
  };

  const validar = () => {
    let primeiro = null;
    campos.forEach((campo) => {
      const valor = campo.value.trim();
      let msg = '';
      if (campo.required && !valor) msg = `Preencha o campo ${campo.dataset.rotulo}.`;
      else if (campo.type === 'email' && valor && !emailValido(valor)) msg = 'Informe um e-mail válido, como nome@empresa.com.br.';
      definirErro(campo, msg);
      if (msg && !primeiro) primeiro = campo;
    });
    status.textContent = primeiro ? 'Corrija os campos destacados para continuar.' : '';
    if (primeiro) primeiro.focus();
    return !primeiro;
  };

  campos.forEach((campo) => campo.addEventListener('input', () => {
    if (campo.hasAttribute('aria-invalid')) definirErro(campo, '');
  }));

  const dadosFormulario = () => {
    const linhas = campos
      .filter((c) => c.value.trim())
      .map((c) => `${c.dataset.rotulo}: ${c.value.trim()}`);
    return { linhas, produto: form.elements.produto.value.trim() };
  };

  document.getElementById('enviar-whatsapp').addEventListener('click', () => {
    if (!validar()) return;
    const { linhas } = dadosFormulario();
    const texto = `${form.dataset.mensagem}\n\n${linhas.join('\n')}`;
    window.open(`https://api.whatsapp.com/send?phone=${form.dataset.whatsapp}&text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validar()) return;
    const { linhas, produto } = dadosFormulario();
    const assunto = `Pedido de orçamento${produto ? ` – ${produto}` : ''}`;
    const corpo = `${form.dataset.mensagem}\n\n${linhas.join('\n')}`;
    location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  });

  // Preenche "produto/CAS" a partir de ?produto= (vindo da Lista de Produtos).
  const produto = new URLSearchParams(location.search).get('produto');
  if (produto) form.elements.produto.value = produto.slice(0, 200);
})();
