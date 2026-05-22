jQuery(document).ready(function() {
    let typedInstance = null;
    
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
        setTimeout(initTyped, 100);
    });
});