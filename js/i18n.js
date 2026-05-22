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
                
                // Check for HTTP errors
                if (!enResponse.ok) throw new Error(`Failed to load en.json: ${enResponse.statusText}`);
                if (!esResponse.ok) throw new Error(`Failed to load es.json: ${esResponse.statusText}`);
                
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
                // Check if value is an object before accessing properties
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    return defaultValue;
                }
            }
            
            return value !== undefined ? value : defaultValue;
        },
        
        getArray(key) {
            const keys = key.split('.');
            let value = this.translations[this.currentLanguage] || {};
            
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
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
            // Update document title first
            const titleKey = 'nav.title';
            const titleTranslation = this.t(titleKey);
            if (titleTranslation !== titleKey) {
                document.title = titleTranslation;
            }
            
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = this.t(key);
                
                // Skip title elements as they were handled above
                if (element.tagName === 'TITLE') {
                    return;
                }
                
                // For elements with nested markup, update only text content
                // This works because we only translate text nodes, not the HTML structure
                let hasChildElements = element.querySelector('*') !== null;
                
                if (hasChildElements) {
                    // For elements with children (like nav links with <span>), 
                    // replace only the direct text node
                    let found = false;
                    for (let i = 0; i < element.childNodes.length; i++) {
                        if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
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
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('translationsUpdated', {
                detail: { language: this.currentLanguage }
            }));
        },
        
        setupLanguageSwitcher() {
            const langToggle = document.getElementById('lang-toggle');
            const langText = document.getElementById('lang-text');
            
            if (langToggle) {
                // Set initial button text
                langText.textContent = this.currentLanguage === 'es' ? 'EN' : 'ES';
                
                langToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
                    this.setLanguage(newLang);
                    // Update button text
                    langText.textContent = newLang === 'es' ? 'EN' : 'ES';
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
