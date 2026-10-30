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
