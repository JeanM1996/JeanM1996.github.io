// Extras: parallax hero, intent picker prefill, FAB tooltip delay, confetti on submit.
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // -------- Parallax hero (subtle) ----------
    function initParallax() {
        if (reduceMotion) return;
        const profile = document.querySelector('#section-hero-2 .img-profile');
        const greeting = document.querySelector('#section-hero-2 h1.big');
        const typedWrap = document.querySelector('#section-hero-2 .h2_s1');
        const ctaWrap = document.querySelector('#section-hero-2 .hero-cta-wrap');
        if (!profile && !greeting) return;

        let ticking = false;
        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                const y = window.scrollY;
                if (y < window.innerHeight) {
                    if (profile)  profile.style.transform  = 'translateY(' + (y * 0.12) + 'px)';
                    if (greeting) greeting.style.transform = 'translateY(' + (y * 0.18) + 'px)';
                    if (typedWrap) typedWrap.style.transform = 'translateY(' + (y * 0.22) + 'px)';
                    if (ctaWrap)   ctaWrap.style.transform   = 'translateY(' + (y * 0.28) + 'px)';
                }
                ticking = false;
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // -------- Intent picker prefills contact form ----------
    function initIntentPicker() {
        const chips = document.querySelectorAll('.intent-chip');
        const subject = document.getElementById('contact-subject');
        const message = document.getElementById('contact-message');
        if (!chips.length) return;

        const prompts = {
            es: {
                app:        { subject: 'Quiero desarrollar una app móvil',         hint: 'Cuéntame qué hace tu app, plataformas (iOS / Android) y fechas estimadas.' },
                web:        { subject: 'Necesito una web o dashboard',             hint: 'Cuéntame el alcance, si tienes diseño previo y para qué la usarás.' },
                mvp:        { subject: 'Quiero validar un MVP / prototipo',        hint: '¿Qué hipótesis quieres probar? ¿Tienes ya investigación con usuarios?' },
                consulting: { subject: 'Busco una consultoría / segunda opinión',  hint: '¿En qué problema estás atascado? Stack, plazos y restricciones.' }
            },
            en: {
                app:        { subject: 'I want to build a mobile app',             hint: 'Tell me what the app does, platforms (iOS / Android) and your timeline.' },
                web:        { subject: 'I need a web app or dashboard',            hint: 'Share the scope, whether you have a design, and what you will use it for.' },
                mvp:        { subject: 'I want to validate an MVP / prototype',    hint: 'Which hypothesis do you want to test? Do you have user research?' },
                consulting: { subject: 'Looking for consulting / a second opinion',hint: 'What are you stuck on? Stack, deadlines and constraints.' }
            }
        };

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                chips.forEach(function (c) { c.classList.remove('is-active'); });
                chip.classList.add('is-active');

                const intent = chip.getAttribute('data-intent');
                const lang = (window.I18N && window.I18N.getLanguage && window.I18N.getLanguage()) || 'es';
                const data = (prompts[lang] || prompts.es)[intent];
                if (!data) return;
                if (subject) subject.value = data.subject;
                if (message && !message.value.trim()) {
                    message.value = data.hint;
                }
                if (message) message.focus();
            });
        });
    }

    // -------- FAB tooltip delay ----------
    function initFabTooltip() {
        const fab = document.querySelector('.wa-fab');
        if (!fab) return;
        // Auto-show tooltip once after 4s so users notice the FAB.
        setTimeout(function () {
            fab.classList.add('show-tooltip');
            setTimeout(function () { fab.classList.remove('show-tooltip'); }, 3500);
        }, 4000);
    }

    // -------- Confetti ----------
    function fireConfetti() {
        if (reduceMotion) return;
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10000;';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const colors = ['#e67e22', '#25D366', '#3aa1ff', '#a06bff', '#ff5f9e', '#ffd56b'];
        const N = 140;
        const particles = [];
        for (let i = 0; i < N; i++) {
            particles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 200,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() * -16) - 4,
                size: Math.random() * 7 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                vr: (Math.random() - 0.5) * 0.3,
                shape: Math.random() > 0.5 ? 'rect' : 'circle'
            });
        }

        const gravity = 0.45;
        const drag = 0.99;
        const start = performance.now();
        const duration = 2200;

        function frame(now) {
            const elapsed = now - start;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(function (p) {
                p.vy += gravity;
                p.vx *= drag;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.vr;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;
                if (p.shape === 'rect') {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            });
            if (elapsed < duration) {
                requestAnimationFrame(frame);
            } else {
                canvas.remove();
            }
        }
        requestAnimationFrame(frame);
    }

    function initConfetti() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        form.addEventListener('submit', function () {
            // contact-whatsapp.js handles validation + opening wa.me. We just decorate.
            const name = (form.querySelector('#contact-name') || {}).value;
            const message = (form.querySelector('#contact-message') || {}).value;
            if (name && name.trim() && message && message.trim()) {
                fireConfetti();
            }
        });
    }

    function init() {
        initParallax();
        initIntentPicker();
        initFabTooltip();
        initConfetti();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
