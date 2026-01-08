// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
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
        const thumbnail = post.thumbnail || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        html += `
            <article class="blog-card" data-post="${post.file}">
                <div class="blog-thumbnail" style="background: ${thumbnail};"></div>
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

// Load recent projects (featured ones for homepage)
function loadRecentProjects() {
    const container = document.getElementById('recent-projects');
    if (!container) return;
    
    if (typeof projects === 'undefined' || projects.length === 0) {
        container.innerHTML = '<p>No projects yet.</p>';
        return;
    }
    
    // Get featured projects
    const featuredProjects = projects.filter(p => p.featured);
    
    let html = '';
    featuredProjects.forEach(project => {
        const sizeClass = project.size ? `card-${project.size}` : '';
        const showThumbnail = project.size !== 'small';
        
        html += `
            <div class="content-card ${sizeClass}">
                ${showThumbnail ? `<div class="card-thumbnail" style="background: ${project.thumbnail};"></div>` : ''}
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load ALL projects for Projects tab
function loadAllProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    if (typeof projects === 'undefined' || projects.length === 0) {
        container.innerHTML = '<p>No projects yet.</p>';
        return;
    }
    
    let html = '';
    projects.forEach(project => {
        html += `
            <div class="work-item">
                <div class="work-thumbnail" style="background: ${project.thumbnail};"></div>
                <div class="work-item-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                    ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">View Project →</a>` : ''}
                    ${project.github ? `<a href="${project.github}" class="project-link github-link" target="_blank">GitHub →</a>` : ''}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load ALL books for Reading tab
function loadAllBooks() {
    const container = document.getElementById('books-grid');
    if (!container) return;
    
    if (typeof books === 'undefined' || books.length === 0) {
        container.innerHTML = '<p>No books yet.</p>';
        return;
    }
    
    let html = '';
    books.forEach(book => {
        const sizeClass = book.size ? `card-${book.size}` : '';
        const statusEmoji = book.status === 'reading' ? '📖' : book.status === 'completed' ? '✅' : '📋';
        const statusText = book.status === 'reading' ? 'Reading' : book.status === 'completed' ? 'Completed' : 'Want to Read';
        const showCover = book.size === 'featured' || book.size === 'wide';
        
        html += `
            <div class="book-card content-card ${sizeClass}" data-status="${book.status}">
                ${showCover ? `
                    <div class="book-cover" style="background: ${book.thumbnail};">
                        <span class="book-status-badge ${book.status === 'want' ? 'want' : ''}">${statusEmoji} ${statusText}</span>
                    </div>
                ` : (book.thumbnail && book.size === 'small' ? `<div class="book-cover-mini" style="background: ${book.thumbnail};"></div>` : '')}
                <div class="card-content">
                    <h3>${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    ${book.note ? `<p class="book-note">${book.note}</p>` : ''}
                    ${!showCover ? `<span class="book-status ${book.status === 'want' ? 'want' : ''}">${statusEmoji} ${book.status === 'completed' ? 'Done' : statusText}</span>` : ''}
                </div>
            </div>
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

// Load ALL hobbies for Hobbies tab
function loadAllHobbies() {
    const container = document.getElementById('hobbies-grid');
    if (!container) return;
    
    if (typeof hobbies === 'undefined' || hobbies.length === 0) {
        container.innerHTML = '<p>No hobbies yet.</p>';
        return;
    }
    
    let html = '';
    hobbies.forEach(hobby => {
        const sizeClass = hobby.size ? `card-${hobby.size}` : '';
        const showCover = hobby.size === 'featured' || hobby.size === 'wide';
        
        html += `
            <div class="hobby-card content-card ${sizeClass}">
                ${showCover && hobby.thumbnail ? `
                    <div class="hobby-cover" style="background: ${hobby.thumbnail};">
                        <span class="hobby-icon">${hobby.icon}</span>
                    </div>
                ` : ''}
                <div class="card-content">
                    ${!showCover ? `<span class="hobby-icon-small">${hobby.icon}</span>` : ''}
                    <h3>${hobby.title}</h3>
                    <p>${hobby.description}</p>
                    ${hobby.tags ? `
                        <div class="hobby-tags">
                            ${hobby.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load recent blog posts
function loadRecentBlogs() {
    const container = document.getElementById('recent-blogs');
    if (!container) return;
    
    if (typeof blogPosts === 'undefined' || blogPosts.length === 0) {
        container.innerHTML = '<p>No blog posts yet.</p>';
        return;
    }
    
    // Get up to 4 most recent posts, sorted by date
    const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentPosts = sortedPosts.slice(0, 4);
    
    let html = '';
    recentPosts.forEach(post => {
        const formattedDate = formatDate(post.date);
        const thumbnail = post.thumbnail || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        html += `
            <div class="content-card blog-card-preview" data-post="${post.file}">
                <div class="card-thumbnail" style="background: ${thumbnail};"></div>
                <div class="card-content">
                    <p class="post-date">${formattedDate}</p>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                </div>
            </div>
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
