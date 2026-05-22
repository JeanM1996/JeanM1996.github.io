// Contact form -> WhatsApp deep link
(function () {
    'use strict';

    const WHATSAPP_NUMBER = '593978600824';

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = (form.querySelector('#contact-name').value || '').trim();
            const email = (form.querySelector('#contact-email').value || '').trim();
            const subject = (form.querySelector('#contact-subject').value || '').trim();
            const budget = (form.querySelector('#contact-budget') && form.querySelector('#contact-budget').value || '').trim();
            const message = (form.querySelector('#contact-message').value || '').trim();

            if (!name || !message) {
                form.querySelector(!name ? '#contact-name' : '#contact-message').focus();
                return;
            }

            const lang = (window.I18N && window.I18N.getLanguage && window.I18N.getLanguage()) || 'es';
            const labels = lang === 'en'
                ? { hi: 'Hello Jean,', from: 'From', email: 'Email', subject: 'Subject', budget: 'Budget', message: 'Message' }
                : { hi: 'Hola Jean,', from: 'De', email: 'Correo', subject: 'Asunto', budget: 'Presupuesto', message: 'Mensaje' };

            const lines = [
                labels.hi,
                '',
                `*${labels.from}:* ${name}`
            ];
            if (email)   lines.push(`*${labels.email}:* ${email}`);
            if (subject) lines.push(`*${labels.subject}:* ${subject}`);
            if (budget)  lines.push(`*${labels.budget}:* ${budget}`);
            lines.push('', `*${labels.message}:*`, message);

            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
            window.open(url, '_blank', 'noopener');
        });
    });
})();
