// Reliable in-view animations: progress bars + stat counters.
// Replaces the position-gated implementations in designesia.js that
// occasionally skipped elements outside the initial threshold.
(function () {
    'use strict';

    function fill(bar) {
        const value = bar.getAttribute('data-value');
        if (!value) return;
        // Defer one frame so the browser registers the initial 0 width
        // before transitioning to the target value.
        requestAnimationFrame(function () {
            bar.style.width = value;
        });
        const container = bar.closest('.de-progress');
        if (container) {
            const valueEl = container.querySelector('.value');
            if (valueEl) valueEl.textContent = value;
        }
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-to') || '0', 10);
        const duration = parseInt(el.getAttribute('data-speed') || '2000', 10);
        if (!target) { el.textContent = '0'; return; }
        const start = performance.now();
        function tick(now) {
            const elapsed = Math.min(1, (now - start) / duration);
            // ease-out-cubic
            const eased = 1 - Math.pow(1 - elapsed, 3);
            const value = Math.floor(target * eased);
            el.textContent = value.toLocaleString();
            if (elapsed < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(tick);
    }

    function observe(elements, callback) {
        if (!('IntersectionObserver' in window)) {
            elements.forEach(callback);
            return;
        }
        const io = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        elements.forEach(function (el) { io.observe(el); });
    }

    function init() {
        const bars = document.querySelectorAll('.de-progress .progress-bar[data-value]');
        if (bars.length) observe(Array.from(bars), fill);

        const counters = document.querySelectorAll('.timer[data-to]');
        if (counters.length) observe(Array.from(counters), animateCounter);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
