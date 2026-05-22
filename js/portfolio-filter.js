// Lightweight portfolio filter: pure CSS visibility based on filter class.
// Disables the legacy jQuery.isotope on #gallery so our CSS grid drives layout.
(function () {
    'use strict';

    function init() {
        // Defeat any isotope styles applied by designesia.js
        const gallery = document.getElementById('gallery');
        if (!gallery) return;

        // Wait one tick for designesia to settle, then strip its inline styles.
        function unisotope() {
            if (window.jQuery) {
                try {
                    const $g = window.jQuery(gallery);
                    if ($g.data('isotope')) $g.isotope('destroy');
                } catch (e) { /* noop */ }
            }
            gallery.removeAttribute('style');
            gallery.querySelectorAll('.item').forEach(function (item) {
                item.removeAttribute('style');
            });
        }
        unisotope();
        setTimeout(unisotope, 50);
        setTimeout(unisotope, 250);

        const filters = document.querySelectorAll('.portfolio-filters a');
        const items = gallery.querySelectorAll('.item');

        filters.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                const selector = link.getAttribute('data-filter');
                filters.forEach(function (f) { f.classList.remove('selected'); });
                link.classList.add('selected');
                items.forEach(function (item) {
                    if (selector === '*' || item.matches(selector)) {
                        item.classList.remove('is-hidden');
                    } else {
                        item.classList.add('is-hidden');
                    }
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
