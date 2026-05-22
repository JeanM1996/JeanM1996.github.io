// "Wow" effects: scroll reveals, 3D card tilt, cursor glow follower.
(function () {
    'use strict';

    const isTouch = window.matchMedia('(hover: none)').matches ||
                    ('ontouchstart' in window && !window.matchMedia('(hover: hover)').matches);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // -- Scroll reveals --
    function initReveals() {
        if (reduceMotion) return;
        const targets = document.querySelectorAll(
            '.skill-card, .service-card, .project-card, .contact-card, ' +
            '#section-about .text-center > h2, #section-services .text-center > h2, ' +
            '#section-portfolio .text-center > h2, #section-contact .text-center > h2, ' +
            '#section-about .about-intro, .contact-form, .portfolio-filters, .tech-ticker'
        );
        targets.forEach(function (el) { el.classList.add('reveal'); });

        if (!('IntersectionObserver' in window)) {
            targets.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }
        const io = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        targets.forEach(function (el) { io.observe(el); });
    }

    // -- 3D tilt --
    function initTilt() {
        if (isTouch || reduceMotion) return;
        const tiltables = document.querySelectorAll(
            '.service-card, .skill-card, .project-card, .contact-card'
        );
        tiltables.forEach(function (card) {
            let raf = null;
            const MAX = 7;
            function onMove(event) {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const rx = (0.5 - y) * (MAX * 2);
                const ry = (x - 0.5) * (MAX * 2);
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(function () {
                    card.style.transform =
                        'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-6px)';
                });
            }
            function onLeave() {
                if (raf) cancelAnimationFrame(raf);
                card.style.transform = '';
            }
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
        });
    }

    // -- Cursor glow --
    function initCursorGlow() {
        if (isTouch || reduceMotion) return;
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.setAttribute('aria-hidden', 'true');
        document.body.appendChild(glow);

        let x = window.innerWidth / 2, y = window.innerHeight / 2;
        let tx = x, ty = y;
        let active = false;

        document.addEventListener('mousemove', function (event) {
            tx = event.clientX;
            ty = event.clientY;
            if (!active) {
                glow.classList.add('is-active');
                active = true;
            }
        });
        document.addEventListener('mouseleave', function () {
            glow.classList.remove('is-active');
            active = false;
        });

        function frame() {
            x += (tx - x) * 0.18;
            y += (ty - y) * 0.18;
            glow.style.transform = 'translate3d(' + (x - 150) + 'px, ' + (y - 150) + 'px, 0)';
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);

        const hotSelector = 'a, button, .service-card, .skill-card, .project-card, .contact-card, .lang-btn, .hero-cta, .btn-whatsapp, .portfolio-filters a';
        document.addEventListener('mouseover', function (event) {
            if (event.target.closest && event.target.closest(hotSelector)) {
                glow.classList.add('is-hot');
            }
        });
        document.addEventListener('mouseout', function (event) {
            if (event.target.closest && event.target.closest(hotSelector)) {
                glow.classList.remove('is-hot');
            }
        });
    }

    function init() {
        initReveals();
        initTilt();
        initCursorGlow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
