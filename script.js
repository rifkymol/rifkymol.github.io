// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Load all content when page loads
    // Use setTimeout to ensure config files are loaded first
    setTimeout(() => {
        loadBlogPosts();
        loadRecentContent();
        loadAllProjects();
        loadAllBooks();
        loadAllHobbies();
    }, 100);

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetTab}`);
            
            // Reset blog view when switching tabs
            if (targetTab === 'blog') {
                showBlogList();
            }
        });
    });

    // Handle direct URL navigation (e.g., portfolio.com/#about)
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove # from hash
        if (hash) {
            const targetButton = document.querySelector(`[data-tab="${hash}"]`);
            if (targetButton) {
                targetButton.click();
            }
        }
    }

    // Check for hash on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Handle "View All" buttons for recent content
    document.querySelectorAll('.view-all').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
            if (targetButton) {
                targetButton.click();
            }
        });
    });
});

// Helper function to generate thumbnail style (supports both images and gradients)
function getThumbnailStyle(thumbnail) {
    if (!thumbnail) {
        return 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);';
    }
    // Check if it's an image path (contains file extension or starts with folder path)
    if (thumbnail.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || 
        thumbnail.startsWith('blog/') || 
        thumbnail.startsWith('projects/') || 
        thumbnail.startsWith('books/') || 
        thumbnail.startsWith('hobbies/')) {
        return `background-image: url('${thumbnail}');`;
    }
    // It's a CSS gradient
    return `background: ${thumbnail};`;
}

// Blog functionality
function loadBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    
    if (typeof blogPosts === 'undefined' || blogPosts.length === 0) {
        container.innerHTML = '<p class="no-posts">No blog posts yet. Check back soon!</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Generate HTML for blog grid
    let html = '<div class="blog-grid">';
    sortedPosts.forEach(post => {
        const formattedDate = formatDate(post.date);
        const thumbnailStyle = getThumbnailStyle(post.thumbnail);
        html += `
            <article class="blog-card" data-post="${post.file}">
                <div class="blog-thumbnail" style="${thumbnailStyle}"></div>
                <div class="blog-card-content">
                    <p class="post-date">${formattedDate}</p>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <span class="read-more-btn">Read More →</span>
                </div>
            </article>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
    
    // Add click listeners to blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('click', function() {
            const postFile = this.getAttribute('data-post');
            const postTitle = this.querySelector('h3').textContent;
            const postDate = this.querySelector('.post-date').textContent;
            loadBlogPost(postFile, postTitle, postDate);
        });
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

async function loadBlogPost(file, title, date) {
    const listView = document.getElementById('blog-list-view');
    const postView = document.getElementById('blog-post-view');
    const contentDiv = document.getElementById('blog-content');
    
    // Show loading
    contentDiv.innerHTML = '<p class="loading">Loading post...</p>';
    listView.style.display = 'none';
    postView.style.display = 'block';
    
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Failed to load post');
        
        const markdown = await response.text();
        
        // Parse markdown to HTML using marked.js
        const htmlContent = marked.parse(markdown);
        
        // Display the blog post
        contentDiv.innerHTML = `
            <div class="post-header">
                <h1>${title}</h1>
                <div class="post-date">${date}</div>
            </div>
            <div class="post-content">
                ${htmlContent}
            </div>
        `;
        
        // Scroll to top
        window.scrollTo(0, 0);
        
    } catch (error) {
        contentDiv.innerHTML = `
            <p class="error">Failed to load blog post. Make sure the markdown file exists.</p>
            <p class="error-detail">${error.message}</p>
        `;
    }
}

function showBlogList() {
    const listView = document.getElementById('blog-list-view');
    const postView = document.getElementById('blog-post-view');
    
    listView.style.display = 'block';
    postView.style.display = 'none';
}

// Back to blog list button
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('back-to-blog');
    if (backBtn) {
        backBtn.addEventListener('click', showBlogList);
    }
});

// Load recent content on home page
function loadRecentContent() {
    loadRecentProjects();
    loadRecentBlogs();
}

// Load recent projects for homepage (first 3)
function loadRecentProjects() {
    const container = document.getElementById('recent-projects');
    if (!container) return;
    
    if (typeof projects === 'undefined' || projects.length === 0) {
        container.innerHTML = '<p>No projects yet.</p>';
        return;
    }
    
    // Get first 3 projects for homepage
    const recentProjects = projects.slice(0, 3);
    
    let html = '';
    recentProjects.forEach(project => {
        const thumbnailStyle = getThumbnailStyle(project.thumbnail);
        
        html += `
            <article class="project-card">
                <div class="project-thumbnail" style="${thumbnailStyle}"></div>
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
}

// Load ALL projects for Projects tab (consistent card layout)
function loadAllProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    if (typeof projects === 'undefined' || projects.length === 0) {
        container.innerHTML = '<p>No projects yet.</p>';
        return;
    }
    
    let html = '';
    projects.forEach(project => {
        const thumbnailStyle = getThumbnailStyle(project.thumbnail);
        html += `
            <article class="project-card">
                <div class="project-thumbnail" style="${thumbnailStyle}"></div>
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">View Project →</a>` : ''}
                        ${project.github ? `<a href="${project.github}" class="project-link github-link" target="_blank">GitHub →</a>` : ''}
                    </div>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
}

// Load ALL books for Reading tab (consistent card layout)
function loadAllBooks() {
    const container = document.getElementById('books-grid');
    if (!container) return;
    
    if (typeof books === 'undefined' || books.length === 0) {
        container.innerHTML = '<p>No books yet.</p>';
        return;
    }
    
    let html = '';
    books.forEach(book => {
        const statusEmoji = book.status === 'reading' ? '📖' : book.status === 'completed' ? '✅' : '📋';
        const statusText = book.status === 'reading' ? 'Reading' : book.status === 'completed' ? 'Completed' : 'Want to Read';
        const thumbnailStyle = getThumbnailStyle(book.thumbnail);
        
        html += `
            <article class="book-card" data-status="${book.status}">
                <div class="book-thumbnail" style="${thumbnailStyle}"></div>
                <div class="book-card-content">
                    <span class="book-status-tag ${book.status}">${statusEmoji} ${statusText}</span>
                    <h3>${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                    ${book.note ? `<p class="book-note">${book.note}</p>` : ''}
                    ${book.rating ? `<p class="book-rating">${'⭐'.repeat(book.rating)}</p>` : ''}
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
    
    // Re-attach filter listeners
    attachBookFilterListeners();
}

// Attach filter listeners for books
function attachBookFilterListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            bookCards.forEach(card => {
                const status = card.getAttribute('data-status');
                if (filter === 'all' || status === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Load ALL hobbies for Hobbies tab (consistent card layout)
function loadAllHobbies() {
    const container = document.getElementById('hobbies-grid');
    if (!container) return;
    
    if (typeof hobbies === 'undefined' || hobbies.length === 0) {
        container.innerHTML = '<p>No hobbies yet.</p>';
        return;
    }
    
    let html = '';
    hobbies.forEach(hobby => {
        const thumbnailStyle = getThumbnailStyle(hobby.thumbnail);
        const isGallery = hobby.type === 'gallery';
        
        html += `
            <article class="hobby-card ${isGallery ? 'hobby-gallery-card' : ''}" data-hobby-id="${hobby.id}">
                <div class="hobby-thumbnail" style="${thumbnailStyle}">
                    <span class="hobby-icon-overlay">${hobby.icon}</span>
                </div>
                <div class="hobby-card-content">
                    <h3>${hobby.title}</h3>
                    <p>${hobby.description}</p>
                    ${isGallery && hobby.gallery && hobby.gallery.length > 0 ? `<span class="gallery-indicator">📸 ${hobby.gallery.length} photos</span>` : ''}
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
    
    // Add click listeners for gallery hobbies
    document.querySelectorAll('.hobby-gallery-card').forEach(card => {
        card.addEventListener('click', function() {
            const hobbyId = this.getAttribute('data-hobby-id');
            const hobby = hobbies.find(h => h.id === hobbyId);
            if (hobby && hobby.type === 'gallery') {
                openGalleryView(hobby);
            }
        });
    });
}

// Open gallery view for a hobby
function openGalleryView(hobby) {
    const listView = document.getElementById('hobbies-list-view');
    const galleryView = document.getElementById('gallery-view');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (!listView || !galleryView || !galleryGrid) return;
    
    // Store current gallery for lightbox navigation
    window.currentGallery = hobby.gallery || [];
    window.currentGalleryIndex = 0;
    
    galleryTitle.textContent = `${hobby.icon} ${hobby.title}`;
    
    if (!hobby.gallery || hobby.gallery.length === 0) {
        galleryGrid.innerHTML = '<p class="no-photos">No photos yet. Add some to hobbies-config.js!</p>';
    } else {
        let html = '';
        hobby.gallery.forEach((photo, index) => {
            html += `
                <div class="gallery-item" data-index="${index}">
                    <img src="${photo.src}" alt="${photo.caption || ''}" loading="lazy">
                </div>
            `;
        });
        galleryGrid.innerHTML = html;
        
        // Add click listeners for lightbox
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                openLightbox(index);
            });
        });
    }
    
    listView.style.display = 'none';
    galleryView.style.display = 'block';
    window.scrollTo(0, 0);
}

// Back to hobbies list
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('back-to-hobbies');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            document.getElementById('hobbies-list-view').style.display = 'block';
            document.getElementById('gallery-view').style.display = 'none';
            window.scrollTo(0, 0);
        });
    }
    
    // Lightbox controls
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox || lightbox.style.display !== 'flex') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
});

// Open lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const tagsContainer = document.getElementById('lightbox-tags');
    
    if (!lightbox || !window.currentGallery || !window.currentGallery[index]) return;
    
    window.currentGalleryIndex = index;
    const photo = window.currentGallery[index];
    
    img.src = photo.src;
    caption.textContent = photo.caption || '';
    caption.style.display = photo.caption ? 'block' : 'none';
    
    if (photo.tags && photo.tags.length > 0) {
        tagsContainer.innerHTML = photo.tags.map(tag => `<span class="lightbox-tag">${tag}</span>`).join('');
        tagsContainer.style.display = 'flex';
    } else {
        tagsContainer.style.display = 'none';
    }
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Navigate lightbox
function navigateLightbox(direction) {
    if (!window.currentGallery || window.currentGallery.length === 0) return;
    
    let newIndex = window.currentGalleryIndex + direction;
    if (newIndex < 0) newIndex = window.currentGallery.length - 1;
    if (newIndex >= window.currentGallery.length) newIndex = 0;
    
    openLightbox(newIndex);
}

// Load recent blog posts for homepage
function loadRecentBlogs() {
    const container = document.getElementById('recent-blogs');
    if (!container) return;
    
    if (typeof blogPosts === 'undefined' || blogPosts.length === 0) {
        container.innerHTML = '<p>No blog posts yet.</p>';
        return;
    }
    
    // Get up to 3 most recent posts, sorted by date
    const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentPosts = sortedPosts.slice(0, 3);
    
    let html = '';
    recentPosts.forEach(post => {
        const formattedDate = formatDate(post.date);
        const thumbnailStyle = getThumbnailStyle(post.thumbnail);
        html += `
            <article class="blog-card blog-card-preview" data-post="${post.file}">
                <div class="blog-thumbnail" style="${thumbnailStyle}"></div>
                <div class="blog-card-content">
                    <p class="post-date">${formattedDate}</p>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
    
    // Add click listeners to blog preview cards
    document.querySelectorAll('.blog-card-preview').forEach(card => {
        card.addEventListener('click', function() {
            const postFile = this.getAttribute('data-post');
            const postTitle = this.querySelector('h3').textContent;
            const postDate = this.querySelector('.post-date').textContent;
            
            // Switch to blog tab
            const blogTabBtn = document.querySelector('[data-tab="blog"]');
            if (blogTabBtn) {
                blogTabBtn.click();
            }
            
            // Load the specific post
            loadBlogPost(postFile, postTitle, postDate);
        });
    });
}
