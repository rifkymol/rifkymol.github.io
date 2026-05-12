function getPhotographyGallery() {
    if (typeof hobbies === 'undefined') return null;
    return hobbies.find(hobby => hobby.id === 'photography');
}

function loadPhotographyGallery() {
    const container = document.getElementById('photography-grid');
    if (!container) return;

    const photography = getPhotographyGallery();
    if (!photography || !photography.gallery || photography.gallery.length === 0) {
        container.innerHTML = '<p class="no-photos">No photos yet.</p>';
        return;
    }

    SiteState.currentGallery = photography.gallery;
    SiteState.currentGalleryIndex = 0;

    container.innerHTML = photography.gallery.map((photo, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${escapeAttribute(photo.src)}" alt="${escapeAttribute(photo.caption || `Photography ${index + 1}`)}" loading="lazy">
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

    const photography = getPhotographyGallery();
    if (!photography || !photography.gallery || photography.gallery.length === 0) {
        container.innerHTML = '<p>No photos yet.</p>';
        return;
    }

    container.innerHTML = photography.gallery.slice(0, 6).map((photo, index) => `
        <div class="gallery-preview-item" data-index="${index}">
            <img src="${escapeAttribute(photo.src)}" alt="${escapeAttribute(photo.caption || `Photography ${index + 1}`)}" loading="lazy">
        </div>
    `).join('');

    container.querySelectorAll('.gallery-preview-item').forEach(item => {
        item.addEventListener('click', () => {
            SiteState.currentGallery = photography.gallery;
            openLightbox(parseInt(item.getAttribute('data-index'), 10));
        });
    });
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
    image.alt = photo.caption || `Photography ${index + 1}`;
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
