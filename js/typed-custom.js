jQuery(document).ready(function ($) {
    const TYPED_REINIT_DELAY = 120;
    let pendingReinit = null;

    function teardownTyped() {
        const $el = $('.typed');
        const existing = $el.data('typed');
        if (existing) {
            // typed.js doesn't expose a public destroy(), so clear its
            // internal timer and remove its cursor sibling manually.
            try { clearInterval(existing.timeout); } catch (e) {}
            try { clearTimeout(existing.timeout); } catch (e) {}
            if (existing.cursor && existing.cursor.remove) {
                existing.cursor.remove();
            }
        }
        $el.removeData('typed');
        $el.empty();
        // Stray cursor spans from any prior failed teardowns.
        $el.siblings('.typed-cursor').remove();
    }

    function initTyped() {
        teardownTyped();
        const $el = $('.typed');
        if (!$el.length) return;
        $el.typed({
            stringsElement: $('.typed-strings'),
            typeSpeed: 80,
            backDelay: 500,
            loop: true,
            contentType: 'html',
            loopCount: false,
            callback: function () { null; }
        });
    }

    function scheduleReinit() {
        if (pendingReinit) clearTimeout(pendingReinit);
        pendingReinit = setTimeout(function () {
            pendingReinit = null;
            initTyped();
        }, TYPED_REINIT_DELAY);
    }

    window.newTyped = initTyped;

    initTyped();

    document.addEventListener('translationsUpdated', scheduleReinit);
});
