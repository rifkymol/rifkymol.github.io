/**
 * Books/Reading Configuration
 * ===========================
 * Add new books here!
 * 
 * Format:
 * {
 *   id: 'unique-id',
 *   title: 'Book Title',
 *   author: 'Author Name',
 *   status: 'reading'|'completed'|'want',
 *   thumbnail: 'books/images/book-cover.jpg' OR 'linear-gradient(...)',
 *   note: 'Your thoughts (optional)',
 *   rating: 1-5 (optional, for completed)
 * }
 * 
 * Images: Store book covers in books/images/ folder
 */

const books = [
    // Currently Reading
    {
        id: 'the-book-you-wish-your-parents-had-read',
        title: 'The Book You Wish Your Parents Had Read',
        author: 'Philippa Perry',
        status: 'reading',
        thumbnail: 'books/images/the-book-you-wish-your-parents-had-read.jpg',
    },    
    {
        id: 'harry-potter-and-the-chamber-of-secrets',
        title: "Harry Potter and the Chamber of Secrets",
        author: 'J.K. Rowling',
        status: 'reading',
        thumbnail: 'books/images/harry-potter-and-the-chamber-of-secrets.jpg'
    },
    
    // Completed Books
    {
        id: 'the-alchemist',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        status: 'completed',
        thumbnail: 'books/images/the-alchemist.png',
        rating: 4.5
    },
    {
        id: 'harry-potter-and-the-sorcerers-stone',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        status: 'completed',
        thumbnail: 'books/images/harry-potter-and-the-sorcerers-stone.jpg',
        rating: 4
    },
    
    // Want to Read
    {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        author: 'James Clear',
        status: 'want',
        thumbnail: 'books/images/atomic-habits.jpg',
    },
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { books };
}
