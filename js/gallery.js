const RECENT_PHOTOS_INITIAL_LIMIT = 6;
const RECENT_PHOTOS_EXPANDED_LIMIT = 12;

function getPhotographyGallery() {
    if (typeof hobbies === 'undefined') return null;
    return hobbies.find(hobby => hobby.id === 'photography');
}

function getNormalizedPhotos() {
    const photography = getPhotographyGallery();
    if (!photography || !Array.isArray(photography.gallery)) return [];

    const seenSources = new Set();
    return photography.gallery
        .filter(photo => photo && photo.src)
        .filter(photo => {
            if (seenSources.has(photo.src)) return false;
            seenSources.add(photo.src);
            return true;
        })
        .map((photo, index) => ({
            ...photo,
            caption: String(photo.caption || '').trim(),
            source: photo.source || 'local',
            tags: Array.isArray(photo.tags) ? photo.tags.map(tag => String(tag).trim()).filter(Boolean) : [],
            alt: photo.alt || photo.caption || `Photography ${index + 1}`
        }));
}

function loadPhotographyGallery() {
    const container = document.getElementById('photography-grid');
    if (!container) return;

    const photos = getNormalizedPhotos();
    if (photos.length === 0) {
        container.innerHTML = '<p class="no-photos">No photos yet.</p>';
        return;
    }

    SiteState.currentGallery = photos;
    SiteState.currentGalleryIndex = 0;

    container.innerHTML = photos.map((photo, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${escapeAttribute(photo.src)}" alt="${escapeAttribute(photo.alt)}" loading="lazy">
            ${photo.caption ? `<span class="gallery-caption">${escapeHTML(photo.caption)}</span>` : ''}
        </div>
    `).join('');

    container.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(parseInt(item.getAttribute('data-index'), 10));
        });
    });
}

function loadRecentPhotos() {
    const container = document.getElementById('recent-photos');
    if (!container) return;

    const photos = getNormalizedPhotos();
    if (photos.length === 0) {
        container.innerHTML = '<p>No photos yet.</p>';
        return;
    }

    const isExpanded = Boolean(SiteState.isRecentPhotosExpanded);
    const limit = isExpanded ? RECENT_PHOTOS_EXPANDED_LIMIT : RECENT_PHOTOS_INITIAL_LIMIT;
    const visiblePhotos = photos.slice(0, Math.min(limit, photos.length));
    const canToggle = photos.length > RECENT_PHOTOS_INITIAL_LIMIT;
    const hasMoreThanExpandedLimit = photos.length > RECENT_PHOTOS_EXPANDED_LIMIT;

    container.innerHTML = visiblePhotos.map((photo, index) => `
        <div class="gallery-preview-item" data-index="${index}">
            <img src="${escapeAttribute(photo.src)}" alt="${escapeAttribute(photo.alt)}" loading="lazy">
        </div>
    `).join('') + (canToggle ? `
        <div class="photo-preview-actions">
            <button type="button" class="photo-preview-toggle">
                ${isExpanded ? 'Show Less' : 'Show More Photos'}
            </button>
            ${isExpanded && hasMoreThanExpandedLimit ? '<button type="button" class="photo-preview-view-all view-all" data-tab="photography">View All Photos →</button>' : ''}
        </div>
    ` : '');

    container.querySelectorAll('.gallery-preview-item').forEach(item => {
        item.addEventListener('click', () => {
            SiteState.currentGallery = photos;
            openLightbox(parseInt(item.getAttribute('data-index'), 10));
        });
    });

    const toggleButton = container.querySelector('.photo-preview-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            SiteState.isRecentPhotosExpanded = !SiteState.isRecentPhotosExpanded;
            loadRecentPhotos();
        });
    }

    const viewAllButton = container.querySelector('.photo-preview-view-all');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', () => {
            switchTab(viewAllButton.getAttribute('data-tab'));
        });
    }
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeButton = document.querySelector('.lightbox-close');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');

    if (closeButton) closeButton.addEventListener('click', closeLightbox);
    if (prevButton) prevButton.addEventListener('click', () => navigateLightbox(-1));
    if (nextButton) nextButton.addEventListener('click', () => navigateLightbox(1));

    if (lightbox) {
        lightbox.addEventListener('click', event => {
            if (event.target === lightbox || event.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', event => {
        if (!lightbox || lightbox.style.display !== 'flex') return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') navigateLightbox(-1);
        if (event.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const tagsContainer = document.getElementById('lightbox-tags');

    if (!lightbox || !SiteState.currentGallery[index]) return;

    SiteState.currentGalleryIndex = index;
    const photo = SiteState.currentGallery[index];

    image.src = photo.src;
    image.alt = photo.alt || photo.caption || `Photography ${index + 1}`;
    caption.textContent = photo.caption || '';
    caption.style.display = photo.caption ? 'block' : 'none';

    const tags = Array.isArray(photo.tags) ? photo.tags.filter(Boolean) : [];
    if (tags.length > 0) {
        tagsContainer.innerHTML = tags.map(tag => `<span class="lightbox-tag">${escapeHTML(tag)}</span>`).join('');
        tagsContainer.style.display = 'flex';
    } else {
        tagsContainer.innerHTML = '';
        tagsContainer.style.display = 'none';
    }

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (!SiteState.currentGallery.length) return;

    let newIndex = SiteState.currentGalleryIndex + direction;
    if (newIndex < 0) newIndex = SiteState.currentGallery.length - 1;
    if (newIndex >= SiteState.currentGallery.length) newIndex = 0;

    openLightbox(newIndex);
}
