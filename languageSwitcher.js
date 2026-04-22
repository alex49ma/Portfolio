const languageSwitcher = {
    init: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get('lang') || localStorage.getItem('lang') || 'en';
        this.setLanguage(lang);
    },

    setLanguage: function(lang) {
        if (!translations[lang]) return;

        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        if (translations[lang].page_title) {
            document.title = translations[lang].page_title;
        }

        // Update active class on language switcher
        document.querySelectorAll('.lang-switcher span').forEach(el => {
            if (el.getAttribute('onclick').includes(`'${lang}'`)) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translations[lang];
            
            for (const key of keys) {
                if (value[key] === undefined) {
                    value = null;
                    break;
                }
                value = value[key];
            }
            
            if (value) {
                element.innerHTML = value;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const keys = element.getAttribute('data-i18n-placeholder').split('.');
            let value = translations[lang];
            
            for (const key of keys) {
                if (value[key] === undefined) {
                    value = null;
                    break;
                }
                value = value[key];
            }
            
            if (value) {
                element.placeholder = value;
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    languageSwitcher.init();
});
