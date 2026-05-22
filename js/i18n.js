// Internationalization (i18n) Module
(function() {
    'use strict';
    
    const I18N = {
        currentLanguage: 'es',
        translations: {},
        
        async init() {
            // Load translations
            try {
                const [enResponse, esResponse] = await Promise.all([
                    fetch('i18n/en.json'),
                    fetch('i18n/es.json')
                ]);
                
                this.translations.en = await enResponse.json();
                this.translations.es = await esResponse.json();
                
                // Set language from localStorage or default to Spanish
                const savedLanguage = localStorage.getItem('language');
                if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
                    this.currentLanguage = savedLanguage;
                }
                
                // Update page content
                this.updatePageContent();
                
                // Setup language switcher
                this.setupLanguageSwitcher();
                
                // Dispatch custom event
                document.dispatchEvent(new CustomEvent('translationsLoaded', {
                    detail: { language: this.currentLanguage }
                }));
                
            } catch (error) {
                console.error('Error loading translations:', error);
            }
        },
        
        t(key, defaultValue = key) {
            const keys = key.split('.');
            let value = this.translations[this.currentLanguage] || {};
            
            for (const k of keys) {
                value = value[k];
                if (value === undefined) {
                    return defaultValue;
                }
            }
            
            return value;
        },
        
        getArray(key) {
            const keys = key.split('.');
            let value = this.translations[this.currentLanguage] || {};
            
            for (const k of keys) {
                value = value[k];
                if (value === undefined) {
                    return [];
                }
            }
            
            return Array.isArray(value) ? value : [];
        },
        
        setLanguage(lang) {
            if (lang === 'en' || lang === 'es') {
                this.currentLanguage = lang;
                localStorage.setItem('language', lang);
                this.updatePageContent();
                document.dispatchEvent(new CustomEvent('languageChanged', {
                    detail: { language: lang }
                }));
            }
        },
        
        getLanguage() {
            return this.currentLanguage;
        },
        
        updatePageContent() {
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.t(key);
                
                // For elements with nested markup, update only text content
                // This works because we only translate text nodes, not the HTML structure
                let hasNesting = element.querySelector('*') !== null;
                
                if (hasNesting) {
                    // For elements with children (like nav links with <span>), 
                    // replace only the direct text node
                    let found = false;
                    for (let i = 0; i < element.childNodes.length; i++) {
                        if (element.childNodes[i].nodeType === 3) { // TEXT_NODE
                            element.childNodes[i].textContent = translation;
                            found = true;
                            break;
                        }
                    }
                    // If no text node exists, prepend the translation as text
                    if (!found) {
                        element.insertBefore(document.createTextNode(translation), element.firstChild);
                    }
                } else {
                    // For simple elements, just update textContent
                    element.textContent = translation;
                }
            });
            
            // Update language switcher text
            const langText = document.getElementById('lang-text');
            if (langText) {
                langText.textContent = this.currentLanguage.toUpperCase();
            }
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('translationsUpdated', {
                detail: { language: this.currentLanguage }
            }));
        },
        
        setupLanguageSwitcher() {
            const langToggle = document.getElementById('lang-toggle');
            if (langToggle) {
                langToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
                    this.setLanguage(newLang);
                });
            }
        }
    };
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            I18N.init();
        });
    } else {
        I18N.init();
    }
    
    // Export for use in other scripts
    window.I18N = I18N;
    
})();
