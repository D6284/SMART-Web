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
      a.addEventListener('click', function () { links.classList.remove('open'); });
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
      var googleAction = form.getAttribute('data-google-form-action');
      if (googleAction) {
        var details = [];
        form.querySelectorAll('input:not([type="hidden"]), select').forEach(function (field) {
          var label = field.parentElement.querySelector('label');
          if (label && field.value && !field.hasAttribute('data-google-entry')) {
            details.push(label.textContent.replace('*', '').trim() + ': ' + field.value);
          }
        });
        form.querySelectorAll('select').forEach(function (field) {
          if (field.value && field.hasAttribute('data-google-entry')) {
            details.push(field.previousElementSibling.textContent.replace('*', '').trim() + ': ' + field.value);
          }
        });
        var messageField = form.querySelector('[data-google-entry="entry.1054125078"]');
        if (messageField) {
          details.unshift('Academy registration');
          messageField.value = details.join('\n');
        }
        var frameName = 'google-form-submit-' + Date.now();
        var frame = document.createElement('iframe');
        frame.name = frameName;
        frame.hidden = true;
        document.body.appendChild(frame);
        var googleForm = document.createElement('form');
        googleForm.method = 'POST';
        googleForm.action = googleAction.replace(/\/viewform$/, '/formResponse');
        googleForm.target = frameName;
        form.querySelectorAll('[data-google-entry]').forEach(function (field) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = field.getAttribute('data-google-entry');
          input.value = field.value;
          googleForm.appendChild(input);
        });
        document.body.appendChild(googleForm);
        googleForm.submit();
        var successEl = form.parentElement.querySelector('.form-success');
        if (successEl) {
          successEl.textContent = 'Registration submitted successfully. Opening the SMART TECH WhatsApp community...';
          successEl.classList.add('show');
        }
        form.reset();
        setTimeout(function () {
          frame.remove();
          googleForm.remove();
          window.location.href = 'https://chat.whatsapp.com/FJaK5ilMN79ICW2eAh3qia';
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
