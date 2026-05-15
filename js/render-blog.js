function loadBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    const posts = getSortedBlogPosts();
    if (posts.length === 0) {
        container.innerHTML = '<p class="no-posts">No blog posts yet. Check back soon!</p>';
        return;
    }

    container.innerHTML = `
        <div class="blog-grid">
            ${posts.map(post => renderBlogCard(post, { showReadMore: true })).join('')}
        </div>
    `;

    attachBlogCardListeners(container);
}

function getBlogPostBySlug(slug) {
    const posts = getSortedBlogPosts();
    return posts.find(post => post.slug === slug);
}

function renderBlogCard(post, options = {}) {
    const formattedDate = formatDate(post.date);
    const thumbnailStyle = getThumbnailStyle(post.thumbnail);
    const slug = post.slug || post.id;

    return `
        <article class="blog-card${options.preview ? ' blog-card-preview' : ''}" data-slug="${escapeAttribute(slug)}" tabindex="0" role="button" aria-label="Read ${escapeAttribute(post.title)}">
            <div class="blog-thumbnail" style="${thumbnailStyle}" role="img" aria-label="${escapeAttribute(post.title)} thumbnail"></div>
            <div class="blog-card-content">
                <p class="post-date">${escapeHTML(formattedDate)}</p>
                <h3>${escapeHTML(post.title)}</h3>
                <p>${escapeHTML(post.excerpt)}</p>
                ${options.showReadMore ? '<span class="read-more-btn">Read More →</span>' : ''}
            </div>
        </article>
    `;
}

function attachBlogCardListeners(scope) {
    scope.querySelectorAll('.blog-card').forEach(card => {
        const openPost = () => {
            showBlogPostBySlug(card.getAttribute('data-slug'), { updateUrl: true });
        };

        card.addEventListener('click', openPost);
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openPost();
            }
        });
    });
}

function showBlogPostBySlug(slug, options = {}) {
    const post = getBlogPostBySlug(slug);

    if (options.updateUrl !== false) {
        history.pushState(null, '', `/blog/${encodeURIComponent(slug)}`);
    }

    if (!post) {
        showBlogNotFound(slug);
        return;
    }

    loadBlogPost(post);
}

async function loadBlogPost(post) {
    const listView = document.getElementById('blog-list-view');
    const postView = document.getElementById('blog-post-view');
    const contentDiv = document.getElementById('blog-content');

    if (!listView || !postView || !contentDiv) return;

    contentDiv.innerHTML = '<p class="loading">Loading post...</p>';
    listView.style.display = 'none';
    postView.style.display = 'block';

    try {
        const response = await fetch(post.file);
        if (!response.ok) throw new Error('Failed to load post');

        const markdown = await response.text();
        const htmlContent = sanitizeMarkdown(markdown);
        const formattedDate = formatDate(post.date);

        contentDiv.innerHTML = `
            <div class="post-header">
                <div class="post-header-main">
                    <h1>${escapeHTML(post.title)}</h1>
                    <div class="post-date">${escapeHTML(formattedDate)}</div>
                </div>
                <div class="post-header-actions">
                    <button id="share-post" class="share-btn" type="button">Share</button>
                    <span id="share-feedback" class="share-feedback" aria-live="polite"></span>
                </div>
            </div>
            <div class="post-content">
                ${htmlContent}
            </div>
        `;

        attachSharePostListener(post);
        window.scrollTo(0, 0);
    } catch (error) {
        contentDiv.innerHTML = `
            <p class="error">Failed to load blog post. Make sure the markdown file exists.</p>
            <p class="error-detail">${escapeHTML(error.message)}</p>
        `;
    }
}

function showBlogNotFound(slug) {
    const listView = document.getElementById('blog-list-view');
    const postView = document.getElementById('blog-post-view');
    const contentDiv = document.getElementById('blog-content');

    if (!listView || !postView || !contentDiv) return;

    listView.style.display = 'none';
    postView.style.display = 'block';
    contentDiv.innerHTML = `
        <div class="post-header">
            <div class="post-header-main">
                <h1>Post not found</h1>
                <div class="post-date">No article matches "${escapeHTML(slug)}".</div>
            </div>
        </div>
        <p class="error">The blog post you opened does not exist or has moved.</p>
    `;
}

function showBlogList(options = {}) {
    const listView = document.getElementById('blog-list-view');
    const postView = document.getElementById('blog-post-view');

    if (listView) listView.style.display = 'block';
    if (postView) postView.style.display = 'none';

    if (options.updateUrl !== false && window.location.pathname !== '/blog') {
        history.pushState(null, '', '/blog');
    }
}

async function attachSharePostListener(post) {
    const shareButton = document.getElementById('share-post');
    const feedback = document.getElementById('share-feedback');
    if (!shareButton || !feedback) return;

    const url = `${window.location.origin}/blog/${post.slug}`;

    shareButton.addEventListener('click', async () => {
        feedback.textContent = '';

        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url
                });
                return;
            } catch (error) {
                if (error.name === 'AbortError') return;
            }
        }

        try {
            await navigator.clipboard.writeText(url);
            feedback.textContent = 'Link copied';
        } catch (error) {
            feedback.textContent = 'Copy failed';
        }
    });
}

function loadRecentBlogs() {
    const container = document.getElementById('recent-blogs');
    if (!container) return;

    const posts = getSortedBlogPosts();
    if (posts.length === 0) {
        container.innerHTML = '<p>No blog posts yet.</p>';
        return;
    }

    container.innerHTML = posts
        .slice(0, 3)
        .map(post => renderBlogCard(post, { preview: true }))
        .join('');

    container.querySelectorAll('.blog-card-preview').forEach(card => {
        const openPreview = () => {
            switchTab('blog');
            showBlogPostBySlug(card.getAttribute('data-slug'), { updateUrl: true });
        };

        card.addEventListener('click', openPreview);
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openPreview();
            }
        });
    });
}
