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
                
                // Set language from localStorage or detect from browser
                const savedLanguage = localStorage.getItem('language');
                if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
                    this.currentLanguage = savedLanguage;
                } else {
                    // Detect browser language
                    this.currentLanguage = this.detectBrowserLanguage();
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
        
        detectBrowserLanguage() {
            // Get browser language
            const browserLang = (navigator.language || navigator.userLanguage).split('-')[0].toLowerCase();
            
            // Return 'es' if browser language is Spanish, otherwise default to 'en'
            return browserLang === 'es' ? 'es' : 'en';
        },
        
        t(key, defaultValue = null) {
            const keys = key.split('.');
            let value = this.translations[this.currentLanguage] || {};

            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    return defaultValue;
                }
            }

            return value !== undefined && value !== null ? value : defaultValue;
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
                this.updateLanguageSwitcherUI();
                document.dispatchEvent(new CustomEvent('languageChanged', {
                    detail: { language: lang }
                }));
            }
        },
        
        getLanguage() {
            return this.currentLanguage;
        },
        
        updatePageContent() {
            const titleTranslation = this.t('nav.title');
            if (titleTranslation) {
                document.title = titleTranslation;
            }

            document.querySelectorAll('[data-i18n]').forEach(element => {
                if (element.tagName === 'TITLE') return;

                const key = element.getAttribute('data-i18n');
                const hasChildElements = element.querySelector('*') !== null;

                // Cache the original HTML default once so we can fall back
                // to it when a translation is missing.
                if (!element.hasAttribute('data-i18n-default')) {
                    let original = '';
                    if (hasChildElements) {
                        for (let i = 0; i < element.childNodes.length; i++) {
                            const node = element.childNodes[i];
                            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                                original = node.textContent.trim();
                                break;
                            }
                        }
                    } else {
                        original = element.textContent.trim();
                    }
                    element.setAttribute('data-i18n-default', original);
                }

                const fallback = element.getAttribute('data-i18n-default') || '';
                const translation = this.t(key, fallback);

                if (hasChildElements) {
                    let found = false;
                    for (let i = 0; i < element.childNodes.length; i++) {
                        if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
                            element.childNodes[i].textContent = translation;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        element.insertBefore(document.createTextNode(translation), element.firstChild);
                    }
                } else {
                    element.textContent = translation;
                }
            });

            // Update placeholders / values on form inputs
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                if (!element.hasAttribute('data-i18n-placeholder-default')) {
                    element.setAttribute('data-i18n-placeholder-default', element.getAttribute('placeholder') || '');
                }
                const fallback = element.getAttribute('data-i18n-placeholder-default') || '';
                element.setAttribute('placeholder', this.t(key, fallback));
            });

            this.updateTypedStrings();

            document.dispatchEvent(new CustomEvent('translationsUpdated', {
                detail: { language: this.currentLanguage }
            }));
        },
        
        updateTypedStrings() {
            const typedStringsElement = document.getElementById('typed-strings');
            if (!typedStringsElement) return;
            const roles = this.getArray('heroSection.roles');
            if (roles.length > 0) {
                typedStringsElement.innerHTML = roles
                    .map(role => `<p>${role}</p>`)
                    .join('');
            }
            // typed-custom.js listens for `translationsUpdated` and reinits.
        },
        
        setupLanguageSwitcher() {
            const langEsBtn = document.getElementById('lang-es');
            const langEnBtn = document.getElementById('lang-en');
            
            if (langEsBtn && langEnBtn) {
                // Update active state based on current language
                this.updateLanguageSwitcherUI();
                
                // Add click listeners to language buttons
                langEsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setLanguage('es');
                });
                
                langEnBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setLanguage('en');
                });
            }
        },
        
        updateLanguageSwitcherUI() {
            const langEsBtn = document.getElementById('lang-es');
            const langEnBtn = document.getElementById('lang-en');
            
            if (langEsBtn && langEnBtn) {
                // Remove active class from both buttons
                langEsBtn.classList.remove('lang-btn-active');
                langEnBtn.classList.remove('lang-btn-active');
                
                // Add active class to current language button
                if (this.currentLanguage === 'es') {
                    langEsBtn.classList.add('lang-btn-active');
                } else {
                    langEnBtn.classList.add('lang-btn-active');
                }
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
