// Site polish: scroll progress indicator + smooth anchor scrolling.
(function () {
    'use strict';

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initScrollProgress() {
        const bar = document.getElementById('scroll-progress');
        if (!bar) return;

        let ticking = false;
        function update() {
            const doc = document.documentElement;
            const scrollTop = window.scrollY || doc.scrollTop;
            const max = (doc.scrollHeight - doc.clientHeight) || 1;
            const pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
            bar.style.width = pct + '%';
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        update();
    }

    function initSmoothScroll() {
        document.addEventListener('click', function (event) {
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;
            const id = link.getAttribute('href');
            if (!id || id === '#' || id === '#top') return;
            const target = document.querySelector(id);
            if (!target) return;
            event.preventDefault();
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: top,
                behavior: reduceMotion ? 'auto' : 'smooth'
            });
        });
    }

    function init() {
        initScrollProgress();
        initSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
