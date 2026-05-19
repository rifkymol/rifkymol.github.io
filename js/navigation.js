const TAB_ROUTES = {
    home: '/',
    projects: '/projects',
    blog: '/blog',
    reading: '/reading',
    photography: '/photography',
    about: '/about'
};

function getRouteForTab(tab) {
    return TAB_ROUTES[tab] || '/';
}

function getTabForPath(path) {
    return Object.entries(TAB_ROUTES)
        .find(([, route]) => route === path)?.[0] || null;
}

function switchTab(targetTab, options = {}) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const targetButtons = document.querySelectorAll(`.tab-btn[data-tab="${targetTab}"]`);
    const targetButton = targetButtons[0];
    const targetContent = document.getElementById(targetTab);

    if (!targetButton || !targetContent) return;

    tabButtons.forEach(button => button.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    targetButtons.forEach(button => button.classList.add('active'));
    targetContent.classList.add('active');
    targetButton.scrollIntoView({ block: 'nearest', inline: 'center' });

    if (options.updateUrl !== false) {
        history.pushState(null, '', getRouteForTab(targetTab));
    }

    if (targetTab === 'blog' && options.showBlogList !== false) {
        showBlogList();
    }

    if (options.scrollToTop !== false) {
        requestAnimationFrame(() => window.scrollTo(0, 0));
        window.setTimeout(() => window.scrollTo(0, 0), 75);
        window.setTimeout(() => window.scrollTo(0, 0), 300);
    }
}

function initMobileNavigation() {
    const navContainer = document.querySelector('.nav-container');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navContainer || !menuToggle || !navLinks) return;

    function setMenuOpen(isOpen) {
        navContainer.classList.toggle('nav-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation menu' : 'Open navigation menu'
        );
        menuToggle.textContent = isOpen ? '×' : '☰';
    }

    menuToggle.addEventListener('click', () => {
        setMenuOpen(!navContainer.classList.contains('nav-open'));
    });

    navLinks.addEventListener('click', event => {
        if (event.target.closest('.tab-btn')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('click', event => {
        if (
            navContainer.classList.contains('nav-open') &&
            !navContainer.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navContainer.classList.contains('nav-open')) {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 769px)').matches) {
            setMenuOpen(false);
        }
    });
}

function initNavigation() {
    initMobileNavigation();

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.getAttribute('data-tab'));
        });
    });

    document.querySelectorAll('.view-all').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            switchTab(button.getAttribute('data-tab'));
        });
    });

    function handleRouteChange() {
        const path = window.location.pathname.replace(/\/+$/, '') || '/';
        const tab = getTabForPath(path);

        if (tab === 'blog') {
            switchTab('blog', { updateUrl: false });
            showBlogList();
            return;
        }

        if (tab) {
            switchTab(tab, { updateUrl: false });
            return;
        }

        if (path.startsWith('/blog/')) {
            const slug = decodeURIComponent(path.replace('/blog/', ''));
            switchTab('blog', { updateUrl: false, showBlogList: false });
            showBlogPostBySlug(slug, { updateUrl: false });
            return;
        }

        switchTab('home', { updateUrl: false });
    }

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
}
