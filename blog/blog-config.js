/**
 * Blog Posts Configuration
 * ========================
 * Add new blog posts here!
 * 
 * Format:
 * {
 *   id: 'unique-id',
 *   title: 'Post Title',
 *   date: 'YYYY-MM-DD',
 *   excerpt: 'Short description...',
 *   thumbnail: 'blog/images/my-image.jpg' OR 'linear-gradient(...)',
 *   file: 'blog/post-name.md'
 * }
 * 
 * Images: Store in blog/images/ folder
 * Posts: Store .md files in blog/ folder
 */
const blogPosts = [
    {
        id: "first-blog-post",
        title: "My First Blog Post",
        date: "2026-01-07",
        excerpt: "A quick introduction to what I'll be writing about and my journey in tech...",
        thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        file: "blog/first-post.md"
    },
    {
        id: "learning-python",
        title: "Learning Python in 2026",
        date: "2026-01-05",
        excerpt: "Thoughts on learning Python and building cool projects with AI and web development...",
        thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        file: "blog/learning-python.md"
    }
];
