// Chemi Pharma – Script compartilhado de WhatsApp Flutuante.
// Arquivo gerado automaticamente por scripts/build.mjs a partir de src/templates/widgets.html.
(() => {
  'use strict';

  const WIDGETS_TPL = "    <div class=\"widgets-flutuantes\">\n      <a class=\"whatsapp-flutuante\" href=\"https://api.whatsapp.com/send?phone=5561984241187&amp;text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento.\" target=\"_blank\" rel=\"noopener\" aria-label=\"Falar pelo WhatsApp\">\n        <svg class=\"icone\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z\"/><path d=\"M9 8.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.9.7a4 4 0 0 1-1.8-1.8l.7-.9-1-2z\"/></svg>\n      </a>\n    </div>\n";
  const body = document.body;
  const raiz = body.dataset.raiz || './';
  const container = document.getElementById('site-widgets');
  if (!container) return;

  container.innerHTML = WIDGETS_TPL.replaceAll("__RAIZ__", raiz);
})();
