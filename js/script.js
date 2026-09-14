// SMART TECH — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Generic client-side validation + success message for demo forms.
  // Replace this handler with a real backend/API endpoint when ready.
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var whatsappNumber = form.getAttribute('data-whatsapp-submit');
      if (whatsappNumber) {
        var details = [];
        form.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach(function (field) {
          var label = field.parentElement.querySelector('label');
          if (label && field.value) {
            details.push(label.textContent.replace('*', '').trim() + ': ' + field.value);
          }
        });
        var whatsappTitle = form.getAttribute('data-whatsapp-title') || 'SMART TECH application';
        var whatsappMessage = encodeURIComponent(whatsappTitle + '\n\n' + details.join('\n'));
        var successEl = form.parentElement.querySelector('.form-success');
        if (successEl) {
          successEl.textContent = 'Opening WhatsApp with your application details...';
          successEl.classList.add('show');
        }
        form.reset();
        setTimeout(function () {
          window.location.href = 'https://wa.me/' + whatsappNumber + '?text=' + whatsappMessage;
        }, 1500);
        return;
      }
      var successEl = form.parentElement.querySelector('.form-success');
      if (successEl) {
        successEl.classList.add('show');
        successEl.setAttribute('tabindex', '-1');
        successEl.focus();
      }
      form.reset();
      var redirectUrl = form.getAttribute('data-redirect-after-submit');
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    });
  });

});
