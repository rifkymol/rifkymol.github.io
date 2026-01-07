// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Load blog posts when page loads
    loadBlogPosts();

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
    
    // Generate HTML for blog list
    let html = '';
    sortedPosts.forEach(post => {
        const formattedDate = formatDate(post.date);
        html += `
            <article class="blog-post" data-post-id="${post.id}">
                <div class="post-date">${formattedDate}</div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more" onclick="loadBlogPost('${post.file}', '${post.title}', '${formattedDate}'); return false;">Read more →</a>
            </article>
        `;
    });
    
    container.innerHTML = html;
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
