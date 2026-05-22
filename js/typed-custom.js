jQuery(document).ready(function() {
    function initTyped() {
        $(".typed").typed({
            stringsElement: $('.typed-strings'),
            typeSpeed: 100,
            backDelay: 500,
            loop: true,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
            callback: function () { null; },
            resetCallback: function () { initTyped(); }
        });
    }
    
    // Global function for reinitializing typed
    window.newTyped = initTyped;
    
    // Initialize on DOM ready
    initTyped();
    
    // Reinitialize when translations are updated
    document.addEventListener('translationsUpdated', function() {
        // Destroy existing typed instances
        $(".typed").each(function() {
            if ($(this).data('typed')) {
                $(this).data('typed').destroy();
            }
        });
        // Reinitialize
        setTimeout(initTyped, 100);
    });
});