const SiteState = {
    currentGallery: [],
    currentGalleryIndex: 0
};

function escapeHTML(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
    return escapeHTML(value).replace(/`/g, '&#96;');
}

function escapeCSSURL(value) {
    return String(value ?? '').replace(/['"\\\n\r]/g, '');
}

function getThumbnailStyle(thumbnail) {
    if (!thumbnail) {
        return 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);';
    }

    const value = String(thumbnail);
    const isImagePath = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value) ||
        value.startsWith('blog/') ||
        value.startsWith('projects/') ||
        value.startsWith('books/') ||
        value.startsWith('hobbies/');

    if (isImagePath) {
        return `background-image: url('${escapeCSSURL(value)}');`;
    }

    return `background: ${escapeCSSURL(value)};`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getSortedBlogPosts() {
    if (typeof blogPosts === 'undefined') return [];
    return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getBookStatusMeta(status) {
    const map = {
        reading: { label: 'Reading', icon: '📖' },
        completed: { label: 'Completed', icon: '✅' },
        want: { label: 'Want to Read', icon: '📋' }
    };

    return map[status] || map.want;
}

function renderStars(rating) {
    if (!rating) return '';

    const max = 5;
    const rounded = Math.max(0, Math.min(max, Math.round(Number(rating) * 2) / 2));
    const full = Math.floor(rounded);
    const hasHalf = rounded % 1 !== 0;
    const empty = max - full - (hasHalf ? 1 : 0);

    return `${'★'.repeat(full)}${hasHalf ? '½' : ''}${'☆'.repeat(empty)}`;
}

function sanitizeMarkdown(markdown) {
    const parsed = marked.parse(markdown);
    if (typeof DOMPurify === 'undefined') {
        return parsed;
    }

    return DOMPurify.sanitize(parsed, {
        USE_PROFILES: { html: true }
    });
}
