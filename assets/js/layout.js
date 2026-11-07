// Chemi Pharma – Header e Footer compartilhados em todas as páginas.
// Arquivo gerado automaticamente por scripts/build.mjs a partir de src/templates/{header,footer}.html.
(() => {
  'use strict';

  const HEADER_TPL = "    <div class=\"container cabecalho__interno\">\n      <a class=\"logo\" href=\"__RAIZ__\">\n        <img class=\"logo__img\" src=\"__RAIZ__assets/img/logo.jpg\" alt=\"Espaço reservado para o logotipo da Chemi Pharma\" width=\"180\" height=\"60\" decoding=\"async\">\n        <span class=\"logo__texto\">Chemi Pharma</span>\n      </a>\n      <button class=\"nav-toggle\" type=\"button\" aria-expanded=\"false\" aria-controls=\"menu-principal\" aria-label=\"Menu\">\n        <span class=\"nav-toggle__barras\" aria-hidden=\"true\"></span>\n      </button>\n      <nav id=\"menu-principal\" class=\"nav\" aria-label=\"Principal\">\n        <ul class=\"nav__lista\">\n          <li><a href=\"__RAIZ__\" data-slug=\"\">Home</a></li>\n          <li><a href=\"__RAIZ__quienes-somos/\" data-slug=\"quienes-somos\">Quem Somos</a></li>\n          <li><a href=\"__RAIZ__lista-de-produtos-e-precos/\" data-slug=\"lista-de-produtos-e-precos\">Lista de Produtos e preços</a></li>\n          <li class=\"nav__item--sub\">\n            <a href=\"__RAIZ__nossos-servicos/\" data-slug=\"nossos-servicos\">Nossos serviços</a>\n            <button class=\"nav__sub-botao\" type=\"button\" aria-expanded=\"false\" aria-controls=\"submenu-servicos\" aria-label=\"Submenu de Nossos serviços\"><svg class=\"icone\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m6 9 6 6 6-6\"/></svg></button>\n            <ul id=\"submenu-servicos\" class=\"nav__sub\">\n              <li><a href=\"__RAIZ__importacao/\" data-slug=\"importacao\">Importação</a></li>\n              <li><a href=\"__RAIZ__comercio/\" data-slug=\"comercio\">Comércio</a></li>\n              <li><a href=\"__RAIZ__reembalagem/\" data-slug=\"reembalagem\">Reembalagem</a></li>\n              <li><a href=\"__RAIZ__revenda/\" data-slug=\"revenda\">Revenda</a></li>\n              <li><a href=\"__RAIZ__sintese/\" data-slug=\"sintese\">Síntese</a></li>\n              <li><a href=\"__RAIZ__fracionamento/\" data-slug=\"fracionamento\">Fracionamento</a></li>\n            </ul>\n          </li>\n          <li><a href=\"__RAIZ__parcerias/\" data-slug=\"parcerias\">Parcerias</a></li>\n          <li><a href=\"__RAIZ__contacto/\" data-slug=\"contacto\">Contato</a></li>\n        </ul>\n      </nav>\n      <a class=\"btn btn--cta\" href=\"__RAIZ__contacto/\">FAÇA SEU ORÇAMENTO</a>\n    </div>\n";
  const FOOTER_TPL = "    <div class=\"container\">\n      <div class=\"grade rodape__grade\">\n        <div class=\"col col-md-4\">\n          <p class=\"rodape__marca\">Chemi Pharma</p>\n          <p>Núcleo Rural Rio Preto, Chácara nº 23 – Planaltina, Brasília-DF</p>\n          \n        </div>\n        <nav class=\"col col-md-4\" aria-label=\"Rodapé\">\n          <h2 class=\"rodape__titulo\">Navegação</h2>\n          <ul class=\"rodape__lista\">\n            <li><a href=\"__RAIZ__\" data-slug=\"\">Home</a></li>\n            <li><a href=\"__RAIZ__quienes-somos/\" data-slug=\"quienes-somos\">Quem Somos</a></li>\n            <li><a href=\"__RAIZ__nossos-servicos/\" data-slug=\"nossos-servicos\">Nossos serviços</a></li>\n            <li><a href=\"__RAIZ__parcerias/\" data-slug=\"parcerias\">Parcerias</a></li>\n            <li><a href=\"__RAIZ__contacto/\" data-slug=\"contacto\">Contato</a></li>\n            <li><a href=\"__RAIZ__lista-de-produtos-e-precos/\" data-slug=\"lista-de-produtos-e-precos\">Lista de Produtos e Preços</a></li>\n          </ul>\n        </nav>\n        <div class=\"col col-md-4\">\n          <h2 class=\"rodape__titulo\">Contato</h2>\n          <ul class=\"rodape__lista\">\n            <li><a href=\"mailto:hadesquimica@chemipharma.com.br\">hadesquimica@chemipharma.com.br</a></li>\n            <li><a href=\"https://api.whatsapp.com/send?phone=5561984241187&amp;text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento.\" target=\"_blank\" rel=\"noopener\">WhatsApp (61) 98424-1187</a></li>\n          </ul>\n          \n        </div>\n      </div>\n      <p class=\"rodape__aviso\">Comercialização sujeita às restrições legais aplicáveis a produtos químicos controlados.</p>\n      \n      <p class=\"rodape__copy\">© <span data-ano>2026</span> Chemi Pharma</p>\n    </div>\n";
  const SERVICOS_SLUGS = new Set(["importacao","comercio","reembalagem","revenda","sintese","fracionamento"]);

  const body = document.body;
  const raiz = body.dataset.raiz || './';
  const paginaAtual = body.dataset.pagina ?? '';

  const aplicarRaiz = (tpl) => tpl.replaceAll("__RAIZ__", raiz);

  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = aplicarRaiz(HEADER_TPL);
    headerEl.querySelectorAll('a[data-slug]').forEach((link) => {
      if (link.dataset.slug === paginaAtual) {
        link.setAttribute('aria-current', 'page');
      }
    });
    if (SERVICOS_SLUGS.has(paginaAtual)) {
      const subItem = headerEl.querySelector('.nav__item--sub');
      if (subItem) subItem.classList.add('is-ativo');
    }
  }

  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = aplicarRaiz(FOOTER_TPL);
    footerEl.querySelectorAll('[data-ano]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  // ---------- Comportamento do Menu (hambúrguer + submenu) ----------
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 960px)');
  const botaoMenu = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu-principal');
  const itensSub = [...document.querySelectorAll('.nav__item--sub')];

  const alternarSub = (item, abrir) => {
    const botao = item.querySelector('.nav__sub-botao');
    item.classList.toggle('is-aberto', abrir);
    if (botao) botao.setAttribute('aria-expanded', String(abrir));
  };
  const fecharSubs = (exceto) => itensSub.forEach((i) => i !== exceto && alternarSub(i, false));
  const alternarMenu = (abrir) => {
    if (!nav || !botaoMenu) return;
    nav.classList.toggle('is-aberto', abrir);
    botaoMenu.setAttribute('aria-expanded', String(abrir));
    if (!abrir) fecharSubs();
  };

  if (botaoMenu && nav) {
    botaoMenu.addEventListener('click', () => alternarMenu(!nav.classList.contains('is-aberto')));
  }
  itensSub.forEach((item) => {
    const botao = item.querySelector('.nav__sub-botao');
    if (botao) {
      botao.addEventListener('click', () => {
        const abrir = !item.classList.contains('is-aberto');
        fecharSubs(item);
        alternarSub(item, abrir);
      });
    }
    item.addEventListener('focusout', (e) => {
      if (desktop.matches && !item.contains(e.relatedTarget)) alternarSub(item, false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const subAberto = itensSub.find((i) => i.classList.contains('is-aberto'));
    if (subAberto) {
      alternarSub(subAberto, false);
      subAberto.querySelector('.nav__sub-botao')?.focus();
    } else if (nav && nav.classList.contains('is-aberto')) {
      alternarMenu(false);
      botaoMenu?.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.cabecalho')) return;
    fecharSubs();
    if (nav && nav.classList.contains('is-aberto')) alternarMenu(false);
  });

  desktop.addEventListener('change', () => nav && alternarMenu(false));

  // ---------- Rolagem suave para #âncoras ----------
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
})();
