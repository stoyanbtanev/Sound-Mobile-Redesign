document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Language Persistence Logic
    let currentLang = localStorage.getItem('sm-lang') || 'bg';
    const langBtns = document.querySelectorAll('.lang-btn');

    const updateLanguage = (lang) => {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('sm-lang', lang);
        currentLang = lang;

        // Update all data-bg/data-en elements
        document.querySelectorAll('[data-bg]').forEach(el => {
            el.innerText = lang === 'bg' ? el.getAttribute('data-bg') : el.getAttribute('data-en');
        });

        // Update active class on lang buttons
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.innerText.toLowerCase() === lang);
        });
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.innerText.toLowerCase());
        });
    });

    // Initialize Language
    updateLanguage(currentLang);

    // 2. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item, .overlay-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 3. Mobile Menu Toggle
    const menuTrigger = document.querySelector('.menu-trigger');
    const navOverlay = document.querySelector('.nav-overlay');
    const overlayLinks = document.querySelectorAll('.overlay-nav a');

    if (menuTrigger && navOverlay) {
        menuTrigger.addEventListener('click', () => {
            const isActive = menuTrigger.classList.toggle('active');
            navOverlay.classList.toggle('active');
            if (window.innerWidth <= 1024) {
                document.body.style.overflow = isActive ? 'hidden' : '';
            }
        });

        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuTrigger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 4. Reveal Animations (Intersection Observer)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
