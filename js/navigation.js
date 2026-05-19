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
    const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
    const targetContent = document.getElementById(targetTab);

    if (!targetButton || !targetContent) return;

    tabButtons.forEach(button => button.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    targetButton.classList.add('active');
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

function initNavigation() {
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
