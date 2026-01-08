/**
 * Books/Reading Configuration
 * ===========================
 * Tambah buku baru? Edit array di bawah ini!
 * 
 * Format:
 * {
 *   id: 'unique-id',
 *   title: 'Book Title',
 *   author: 'Author Name',
 *   status: 'reading'|'completed'|'want',
 *   thumbnail: 'CSS gradient or image URL',
 *   note: 'Your thoughts (optional)',
 *   rating: 1-5 (optional, for completed),
 *   dateCompleted: 'Month Year' (optional),
 *   size: 'featured'|'wide'|'small'
 * }
 */

const books = [
    // Currently Reading
    {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        author: 'James Clear',
        status: 'reading',
        thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        note: 'Currently on chapter 12. Life-changing concepts!',
        size: 'featured'
    },
    
    // Completed Books
    {
        id: 'pragmatic-programmer',
        title: 'The Pragmatic Programmer',
        author: 'Hunt & Thomas',
        status: 'completed',
        thumbnail: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        rating: 5,
        dateCompleted: 'Dec 2025',
        size: 'small'
    },
    {
        id: 'clean-code',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        status: 'completed',
        thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        rating: 4,
        dateCompleted: 'Nov 2025',
        size: 'small'
    },
    {
        id: 'you-dont-know-js',
        title: "You Don't Know JS",
        author: 'Kyle Simpson',
        status: 'completed',
        thumbnail: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
        rating: 5,
        dateCompleted: 'Oct 2025',
        size: 'small'
    },
    
    // Want to Read
    {
        id: 'ddia',
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        status: 'want',
        thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        note: 'Recommended by many senior engineers',
        size: 'wide'
    },
    {
        id: 'system-design-interview',
        title: 'System Design Interview',
        author: 'Alex Xu',
        status: 'want',
        thumbnail: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        size: 'small'
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { books };
}
