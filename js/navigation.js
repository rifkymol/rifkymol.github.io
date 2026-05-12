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

    if (options.updateHash !== false) {
        history.pushState(null, '', `#${targetTab}`);
    }

    if (targetTab === 'blog') {
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

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchTab(hash, { updateHash: false });
        }
    }

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
}
