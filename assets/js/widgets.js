// Chemi Pharma – Scripts compartilhados de Chat Rápido e WhatsApp Flutuante.
// Arquivo gerado automaticamente por scripts/build.mjs a partir de src/templates/widgets.html.
(() => {
  'use strict';

  const WIDGETS_TPL = "    <div id=\"painel-chat\" class=\"chat-painel\" role=\"dialog\" aria-modal=\"false\" aria-labelledby=\"chat-titulo\" hidden>\n      <div class=\"chat-painel__cabecalho\">\n        <div class=\"chat-painel__info\">\n          <span class=\"chat-painel__status-dot\" aria-hidden=\"true\"></span>\n          <div>\n            <h2 id=\"chat-titulo\" class=\"chat-painel__titulo\">Atendimento Chemi Pharma</h2>\n            <p class=\"chat-painel__subtitulo\">Online • Resposta rápida</p>\n          </div>\n        </div>\n        <button type=\"button\" id=\"chat-fechar\" class=\"chat-painel__fechar\" aria-label=\"Fechar chat\">\n          <svg class=\"icone\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M18 6 6 18M6 6l12 12\"/></svg>\n        </button>\n      </div>\n      <div id=\"chat-mensagens\" class=\"chat-painel__corpo\" aria-live=\"polite\">\n        <div class=\"chat-msg chat-msg--bot\">\n          <p>Olá! Bem-vindo à Chemi Pharma. Como podemos ajudar seu laboratório ou empresa hoje?</p>\n        </div>\n        <div id=\"chat-opcoes\" class=\"chat-opcoes\" role=\"group\" aria-label=\"Assuntos rápidos\">\n          <button type=\"button\" class=\"chat-opcao-btn\" data-indice=\"0\">Cotar reagente / CAS</button>\n          <button type=\"button\" class=\"chat-opcao-btn\" data-indice=\"1\">Importação e Síntese</button>\n          <button type=\"button\" class=\"chat-opcao-btn\" data-indice=\"2\">Fracionamento e Reembalagem</button>\n          <button type=\"button\" class=\"chat-opcao-btn\" data-indice=\"3\">Falar com especialista</button>\n        </div>\n      </div>\n      <form id=\"chat-form\" class=\"chat-painel__rodape\" novalidate>\n        <div class=\"chat-painel__input-grupo\">\n          <label for=\"chat-input\" class=\"sr-only\">Digite o nome do reagente, nº CAS ou sua dúvida...</label>\n          <input type=\"text\" id=\"chat-input\" class=\"chat-painel__input\" placeholder=\"Digite o nome do reagente, nº CAS ou sua dúvida...\" autocomplete=\"off\">\n          <button type=\"submit\" class=\"chat-painel__enviar\" aria-label=\"Enviar mensagem no chat\">\n            <svg class=\"icone\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m22 2-7 20-4-9-9-4Z\"/><path d=\"M22 2 11 13\"/></svg>\n          </button>\n        </div>\n        <div class=\"chat-painel__acoes\">\n          <a id=\"chat-ir-whatsapp\" class=\"btn btn--whatsapp-chat\" href=\"https://api.whatsapp.com/send?phone=5561984241187&amp;text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento.\" target=\"_blank\" rel=\"noopener\">\n            <svg class=\"icone\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z\"/><path d=\"M9 8.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.9.7a4 4 0 0 1-1.8-1.8l.7-.9-1-2z\"/></svg> <span>Continuar no WhatsApp</span>\n          </a>\n          <a id=\"chat-ver-catalogo\" class=\"chat-painel__link-catalogo\" href=\"__RAIZ__lista-de-produtos-e-precos/\">\n            Consultar tabela de preços\n          </a>\n        </div>\n      </form>\n    </div>\n    <div class=\"widgets-flutuantes\">\n      <button type=\"button\" id=\"btn-abrir-chat\" class=\"chat-flutuante\" aria-expanded=\"false\" aria-controls=\"painel-chat\" aria-label=\"Abrir chat de atendimento rápido\">\n        <svg class=\"icone\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z\"/></svg>\n        <span class=\"chat-flutuante__badge\" aria-hidden=\"true\"></span>\n      </button>\n      <a class=\"whatsapp-flutuante\" href=\"https://api.whatsapp.com/send?phone=5561984241187&amp;text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento.\" target=\"_blank\" rel=\"noopener\" aria-label=\"Falar pelo WhatsApp\">\n        <svg class=\"icone\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z\"/><path d=\"M9 8.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.9.7a4 4 0 0 1-1.8-1.8l.7-.9-1-2z\"/></svg>\n      </a>\n    </div>\n";
  const WHATSAPP_NUMERO = "5561984241187";
  const WHATSAPP_MSG_PADRAO = "Olá, gostaria de um orçamento.";
  const OPCOES_RAPIDAS = [{"rotulo":"Cotar reagente / CAS","resposta":"Informe abaixo o nome do reagente ou número CAS e a quantidade desejada. Em seguida, clique em 'Continuar no WhatsApp' para receber sua cotação prioritária.","prefill":"Olá, gostaria de cotar o seguinte reagente/CAS: "},{"rotulo":"Importação e Síntese","resposta":"Realizamos importação direta de química fina e síntese sob encomenda com controle espectrométrico. Descreva sua necessidade abaixo para falarmos com nosso setor técnico.","prefill":"Olá, preciso de informações sobre importação/síntese para: "},{"rotulo":"Fracionamento e Reembalagem","resposta":"Atendemos fracionamento em macro e micro escala (de 1 g/mL a 1 kg/L) com rotulagem completa. Qual produto e volume você procura?","prefill":"Olá, tenho interesse no serviço de fracionamento/reembalagem: "},{"rotulo":"Falar com especialista","resposta":"Nossa equipe comercial e técnica está pronta para atender você. Digite sua mensagem abaixo ou inicie a conversa diretamente pelo WhatsApp.","prefill":"Olá, gostaria de falar com um especialista da Chemi Pharma."}];

  const body = document.body;
  const raiz = body.dataset.raiz || './';
  const container = document.getElementById('site-widgets');
  if (!container) return;

  container.innerHTML = WIDGETS_TPL.replaceAll("__RAIZ__", raiz);

  const painel = document.getElementById('painel-chat');
  const btnAbrir = document.getElementById('btn-abrir-chat');
  const btnFechar = document.getElementById('chat-fechar');
  const mensagensEl = document.getElementById('chat-mensagens');
  const opcoesEl = document.getElementById('chat-opcoes');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const linkWhatsapp = document.getElementById('chat-ir-whatsapp');
  const linkCatalogo = document.getElementById('chat-ver-catalogo');
  const badge = btnAbrir?.querySelector('.chat-flutuante__badge');

  let prefixoAtual = '';
  let ultimaMensagemUsuario = '';

  const montarUrlWhatsapp = (texto) => {
    const msg = (texto || WHATSAPP_MSG_PADRAO).trim();
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(msg)}`;
  };

  const atualizarLinksAcao = () => {
    const digitado = input ? input.value.trim() : '';
    const baseTexto = digitado || ultimaMensagemUsuario;
    const textoFinal = baseTexto
      ? (prefixoAtual ? `${prefixoAtual}${baseTexto}` : baseTexto)
      : (prefixoAtual || WHATSAPP_MSG_PADRAO);
    if (linkWhatsapp) {
      linkWhatsapp.href = montarUrlWhatsapp(textoFinal);
    }
    if (linkCatalogo) {
      linkCatalogo.href = baseTexto
        ? `${raiz}lista-de-produtos-e-precos/?q=${encodeURIComponent(baseTexto)}`
        : `${raiz}lista-de-produtos-e-precos/`;
    }
  };

  const adicionarMensagem = (texto, tipo) => {
    if (!mensagensEl) return;
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg--${tipo}`;
    const p = document.createElement('p');
    p.textContent = texto;
    div.appendChild(p);
    mensagensEl.appendChild(div);
    mensagensEl.scrollTop = mensagensEl.scrollHeight;
  };

  const alternarChat = (abrir) => {
    if (!painel || !btnAbrir) return;
    const vaiAbrir = typeof abrir === 'boolean' ? abrir : painel.hidden;
    painel.hidden = !vaiAbrir;
    btnAbrir.setAttribute('aria-expanded', String(vaiAbrir));
    btnAbrir.classList.toggle('is-ativo', vaiAbrir);
    if (vaiAbrir) {
      if (badge) badge.hidden = true;
      setTimeout(() => input?.focus(), 50);
    } else {
      btnAbrir.focus();
    }
  };

  btnAbrir?.addEventListener('click', () => alternarChat());
  btnFechar?.addEventListener('click', () => alternarChat(false));

  opcoesEl?.addEventListener('click', (e) => {
    const btn = e.target.closest('.chat-opcao-btn');
    if (!btn) return;
    const idx = Number(btn.dataset.indice);
    const op = OPCOES_RAPIDAS[idx];
    if (!op) return;
    adicionarMensagem(op.rotulo, 'usuario');
    adicionarMensagem(op.resposta, 'bot');
    prefixoAtual = op.prefill || '';
    atualizarLinksAcao();
    input?.focus();
  });

  input?.addEventListener('input', atualizarLinksAcao);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input ? input.value.trim() : '';
    if (!texto) {
      input?.focus();
      return;
    }
    ultimaMensagemUsuario = texto;
    adicionarMensagem(texto, 'usuario');
    input.value = '';
    atualizarLinksAcao();
    adicionarMensagem(
      `Recebemos sua solicitação sobre "${texto}". Clique em "Continuar no WhatsApp" abaixo para atendimento imediato com nossa equipe ou consulte na tabela de preços.`,
      'bot'
    );
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && painel && !painel.hidden) {
      alternarChat(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (!painel || painel.hidden) return;
    if (e.target.closest('#site-widgets')) return;
    alternarChat(false);
  });
})();
