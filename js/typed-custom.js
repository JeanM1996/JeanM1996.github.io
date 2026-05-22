jQuery(document).ready(function() {
    let typedInstance = null;
    
    // Delay (ms) to allow DOM updates from i18n to complete before reinitializing typed.js
    const TYPED_REINIT_DELAY = 100;
    
    function initTyped() {
        // Destroy existing instance if it exists
        if (typedInstance) {
            typedInstance.destroy();
        }
        
        // Create new instance
        typedInstance = $(".typed").typed({
            stringsElement: $('.typed-strings'),
            typeSpeed: 100,
            backDelay: 500,
            loop: true,
            contentType: 'html',
            loopCount: false,
            callback: function () { null; }
        });
    }
    
    // Global function for reinitializing typed
    window.newTyped = initTyped;
    
    // Initialize on DOM ready
    initTyped();
    
    // Reinitialize when translations are updated
    document.addEventListener('translationsUpdated', function() {
        setTimeout(initTyped, TYPED_REINIT_DELAY);
    });
});