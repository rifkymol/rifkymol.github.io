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

function renderBlogCard(post, options = {}) {
    const formattedDate = formatDate(post.date);
    const thumbnailStyle = getThumbnailStyle(post.thumbnail);

    return `
        <article class="blog-card${options.preview ? ' blog-card-preview' : ''}" data-post="${escapeAttribute(post.file)}" tabindex="0" role="button" aria-label="Read ${escapeAttribute(post.title)}">
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
            const postFile = card.getAttribute('data-post');
            const postTitle = card.querySelector('h3').textContent;
            const postDate = card.querySelector('.post-date').textContent;
            loadBlogPost(postFile, postTitle, postDate);
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

async function loadBlogPost(file, title, date) {
    const listView = document.getElementById('blog-list-view');
    const postView = document.getElementById('blog-post-view');
    const contentDiv = document.getElementById('blog-content');

    contentDiv.innerHTML = '<p class="loading">Loading post...</p>';
    listView.style.display = 'none';
    postView.style.display = 'block';

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Failed to load post');

        const markdown = await response.text();
        const htmlContent = sanitizeMarkdown(markdown);

        contentDiv.innerHTML = `
            <div class="post-header">
                <h1>${escapeHTML(title)}</h1>
                <div class="post-date">${escapeHTML(date)}</div>
            </div>
            <div class="post-content">
                ${htmlContent}
            </div>
        `;

        window.scrollTo(0, 0);
    } catch (error) {
        contentDiv.innerHTML = `
            <p class="error">Failed to load blog post. Make sure the markdown file exists.</p>
            <p class="error-detail">${escapeHTML(error.message)}</p>
        `;
    }
}

function showBlogList() {
    const listView = document.getElementById('blog-list-view');
    const postView = document.getElementById('blog-post-view');

    if (listView) listView.style.display = 'block';
    if (postView) postView.style.display = 'none';
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
            loadBlogPost(
                card.getAttribute('data-post'),
                card.querySelector('h3').textContent,
                card.querySelector('.post-date').textContent
            );
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
