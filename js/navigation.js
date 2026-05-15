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

    if (options.updateUrl !== false) {
        if (targetTab === 'home') {
            history.pushState(null, '', '/');
        } else if (targetTab === 'blog') {
            history.pushState(null, '', '/blog');
        } else {
            history.pushState(null, '', `/#${targetTab}`);
        }
    }

    if (targetTab === 'blog' && options.showBlogList !== false) {
        showBlogList();
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

        if (path === '/') {
            const hash = window.location.hash.substring(1);
            switchTab(hash || 'home', { updateUrl: false });
            return;
        }

        if (path === '/blog') {
            switchTab('blog', { updateUrl: false });
            showBlogList();
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

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (window.location.pathname === '/' && hash) {
            switchTab(hash, { updateUrl: false });
        }
    }

    handleRouteChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleRouteChange);
}
