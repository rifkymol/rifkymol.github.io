const MEDIUM_PROFILE_URL = 'https://medium.com/@rifkymol';
const MEDIUM_RSS_URL = 'https://medium.com/feed/@rifkymol';
const MEDIUM_RSS_PROXY_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`;
const BLOG_FALLBACK_THUMBNAIL = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

let mediumPostsPromise = null;

async function loadBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    const localPosts = getLocalBlogPosts();
    renderBlogPostList(container, localPosts, {
        showReadMore: true,
        notice: localPosts.length > 0 ? 'Loading Medium posts...' : ''
    });

    try {
        const posts = await getCombinedBlogPosts();
        renderBlogPostList(container, posts, { showReadMore: true });
    } catch (error) {
        renderBlogPostList(container, localPosts, {
            showReadMore: true,
            notice: 'Unable to load Medium posts right now.'
        });
    }
}

async function loadRecentBlogs() {
    const container = document.getElementById('recent-blogs');
    if (!container) return;

    const localPosts = getLocalBlogPosts();
    renderBlogPostList(container, localPosts.slice(0, 3), {
        compact: true,
        notice: localPosts.length > 0 ? 'Loading Medium posts...' : ''
    });

    try {
        const posts = await getCombinedBlogPosts();
        renderBlogPostList(container, posts.slice(0, 3), { compact: true });
    } catch (error) {
        renderBlogPostList(container, localPosts.slice(0, 3), {
            compact: true,
            notice: 'Unable to load Medium posts right now.'
        });
    }
}

function renderBlogPostList(container, posts, options = {}) {
    if (posts.length === 0) {
        container.innerHTML = renderBlogFeedFallback(options.notice || 'No blog posts yet.');
        return;
    }

    const notice = options.notice ? renderBlogFeedNotice(options.notice) : '';
    const cards = posts.map(post => renderBlogCard(post, {
        preview: options.compact,
        showReadMore: options.showReadMore
    })).join('');

    container.innerHTML = options.compact ? `${notice}${cards}` : `
        ${notice}
        <div class="blog-grid">
            ${cards}
        </div>
    `;

    attachBlogCardListeners(container);
}

async function getCombinedBlogPosts() {
    const localPosts = getLocalBlogPosts();
    const mediumPosts = await getMediumPosts();

    return [...localPosts, ...mediumPosts]
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getLocalBlogPosts() {
    if (typeof blogPosts === 'undefined' || !Array.isArray(blogPosts)) return [];

    return blogPosts
        .map(post => ({
            id: post.id || post.slug || post.title,
            slug: post.slug || post.id,
            source: 'local',
            sourceLabel: 'Personal Blog',
            title: post.title || 'Untitled post',
            date: post.date,
            excerpt: post.excerpt || '',
            thumbnail: post.thumbnail || BLOG_FALLBACK_THUMBNAIL,
            file: post.file,
            url: `/blog/${encodeURIComponent(post.slug || post.id)}`,
            external: false
        }))
        .filter(post => post.slug && post.file && post.date);
}

function getMediumPosts() {
    if (!mediumPostsPromise) {
        mediumPostsPromise = fetch(MEDIUM_RSS_PROXY_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load Medium RSS feed');
                }
                return response.json();
            })
            .then(data => {
                if (data.status !== 'ok' || !Array.isArray(data.items)) {
                    throw new Error(data.message || 'Invalid Medium RSS response');
                }

                return data.items
                    .map(normalizeMediumPost)
                    .filter(post => post.title && post.url);
            });
    }

    return mediumPostsPromise;
}

function normalizeMediumPost(item) {
    const html = item.content || item.description || '';

    return {
        id: item.guid || item.link || item.title,
        source: 'medium',
        sourceLabel: 'Medium',
        title: item.title || 'Untitled Medium post',
        date: parseMediumDate(item.pubDate),
        excerpt: truncateText(stripHTML(item.description || item.content || ''), 170),
        thumbnail: item.thumbnail || getFirstImageFromHTML(html) || BLOG_FALLBACK_THUMBNAIL,
        url: item.link,
        external: true
    };
}

function parseMediumDate(value) {
    if (!value) return new Date().toISOString();
    return value.includes(' ') ? value.replace(' ', 'T') : value;
}

function renderBlogCard(post, options = {}) {
    const formattedDate = formatDate(post.date);
    const thumbnailStyle = getThumbnailStyle(post.thumbnail);
    const classes = `blog-card${options.preview ? ' blog-card-preview' : ''}${post.external ? ' blog-card-external' : ' blog-card-local'}`;
    const readMore = options.showReadMore
        ? `<span class="read-more-btn">${post.external ? 'Read on Medium →' : 'Read More →'}</span>`
        : '';
    const content = `
        <div class="blog-thumbnail" style="${thumbnailStyle}" role="img" aria-label="${escapeAttribute(post.title)} thumbnail"></div>
        <div class="blog-card-content">
            <div class="blog-card-meta">
                <span class="source-badge ${post.source === 'medium' ? 'medium' : 'local'}">${escapeHTML(post.sourceLabel)}</span>
                <span class="post-date">${escapeHTML(formattedDate)}</span>
            </div>
            <h3>${escapeHTML(post.title)}</h3>
            <p>${escapeHTML(post.excerpt)}</p>
            ${readMore}
        </div>
    `;

    if (post.external) {
        return `
            <a class="${classes}" href="${escapeAttribute(post.url)}" target="_blank" rel="noopener noreferrer" aria-label="Read ${escapeAttribute(post.title)} on Medium">
                ${content}
            </a>
        `;
    }

    return `
        <article class="${classes}" data-slug="${escapeAttribute(post.slug)}" tabindex="0" role="button" aria-label="Read ${escapeAttribute(post.title)}">
            ${content}
        </article>
    `;
}

function attachBlogCardListeners(scope) {
    scope.querySelectorAll('.blog-card-local').forEach(card => {
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

function getBlogPostBySlug(slug) {
    return getLocalBlogPosts().find(post => post.slug === slug);
}

function showBlogPostBySlug(slug, options = {}) {
    const post = getBlogPostBySlug(slug);

    if (!post) {
        showBlogList({ updateUrl: options.updateUrl });
        return;
    }

    if (options.updateUrl !== false) {
        history.pushState(null, '', post.url);
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
                    <div class="post-date">${escapeHTML(formattedDate)} · ${escapeHTML(post.sourceLabel)}</div>
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

    const url = `${window.location.origin}${post.url}`;

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

function renderBlogFeedNotice(message) {
    return `<p class="blog-feed-notice">${escapeHTML(message)} ${renderMediumProfileLink()}</p>`;
}

function renderBlogFeedFallback(message) {
    return `
        <div class="blog-feed-fallback">
            <p>${escapeHTML(message)}</p>
            ${renderMediumProfileLink()}
        </div>
    `;
}

function renderMediumProfileLink() {
    return `<a href="${MEDIUM_PROFILE_URL}" target="_blank" rel="noopener noreferrer">Open Medium profile →</a>`;
}

function stripHTML(value) {
    const withoutTags = String(value || '')
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (typeof document === 'undefined') return withoutTags;

    const textarea = document.createElement('textarea');
    textarea.innerHTML = withoutTags;
    return textarea.value;
}

function truncateText(value, maxLength) {
    const text = String(value || '').trim();
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}...`;
}

function getFirstImageFromHTML(html) {
    const match = String(html || '').match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : '';
}
