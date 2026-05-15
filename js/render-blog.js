const MEDIUM_PROFILE_URL = 'https://medium.com/@rifkymol';
const MEDIUM_RSS_URL = 'https://medium.com/feed/@rifkymol';
const MEDIUM_RSS_PROXY_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`;
const MEDIUM_FALLBACK_THUMBNAIL = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

let mediumPostsPromise = null;

async function loadBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    container.innerHTML = '<p class="loading">Loading Medium posts...</p>';

    try {
        const posts = await getMediumPosts();
        if (posts.length === 0) {
            container.innerHTML = renderMediumFeedFallback('No Medium posts yet.');
            return;
        }

        container.innerHTML = `
            <div class="blog-grid">
                ${posts.map(post => renderBlogCard(post, { showReadMore: true })).join('')}
            </div>
        `;
    } catch (error) {
        container.innerHTML = renderMediumFeedFallback('Unable to load Medium posts right now.');
    }
}

async function loadRecentBlogs() {
    const container = document.getElementById('recent-blogs');
    if (!container) return;

    container.innerHTML = '<p class="loading">Loading Medium posts...</p>';

    try {
        const posts = await getMediumPosts();
        if (posts.length === 0) {
            container.innerHTML = renderMediumFeedFallback('No Medium posts yet.');
            return;
        }

        container.innerHTML = posts
            .slice(0, 3)
            .map(post => renderBlogCard(post, { preview: true }))
            .join('');
    } catch (error) {
        container.innerHTML = renderMediumFeedFallback('Unable to load Medium posts right now.');
    }
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
                    .filter(post => post.title && post.link)
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
            });
    }

    return mediumPostsPromise;
}

function normalizeMediumPost(item) {
    const html = item.content || item.description || '';

    return {
        id: item.guid || item.link || item.title,
        title: item.title || 'Untitled Medium post',
        date: parseMediumDate(item.pubDate),
        excerpt: truncateText(stripHTML(item.description || item.content || ''), 170),
        thumbnail: item.thumbnail || getFirstImageFromHTML(html) || MEDIUM_FALLBACK_THUMBNAIL,
        link: item.link,
        source: 'Medium'
    };
}

function parseMediumDate(value) {
    if (!value) return new Date().toISOString();
    return value.includes(' ') ? value.replace(' ', 'T') : value;
}

function renderBlogCard(post, options = {}) {
    const formattedDate = formatDate(post.date);
    const thumbnailStyle = getThumbnailStyle(post.thumbnail);

    return `
        <a class="blog-card${options.preview ? ' blog-card-preview' : ''}" href="${escapeAttribute(post.link)}" target="_blank" rel="noopener noreferrer" aria-label="Read ${escapeAttribute(post.title)} on Medium">
            <div class="blog-thumbnail" style="${thumbnailStyle}" role="img" aria-label="${escapeAttribute(post.title)} thumbnail"></div>
            <div class="blog-card-content">
                <p class="post-date">${escapeHTML(formattedDate)} · Medium</p>
                <h3>${escapeHTML(post.title)}</h3>
                <p>${escapeHTML(post.excerpt)}</p>
                ${options.showReadMore ? '<span class="read-more-btn">Read on Medium →</span>' : ''}
            </div>
        </a>
    `;
}

function renderMediumFeedFallback(message) {
    return `
        <div class="blog-feed-fallback">
            <p>${escapeHTML(message)}</p>
            <a href="${MEDIUM_PROFILE_URL}" target="_blank" rel="noopener noreferrer">Open Medium profile →</a>
        </div>
    `;
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

function showBlogList(options = {}) {
    const listView = document.getElementById('blog-list-view');
    const postView = document.getElementById('blog-post-view');

    if (listView) listView.style.display = 'block';
    if (postView) postView.style.display = 'none';

    if (options.updateUrl !== false && window.location.pathname !== '/blog') {
        history.pushState(null, '', '/blog');
    }
}

function showBlogPostBySlug() {
    showBlogList();
}
