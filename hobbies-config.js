/**
 * Hobbies Configuration
 * =====================
 * Tambah hobby baru? Edit array di bawah ini!
 * 
 * Format:
 * {
 *   id: 'unique-id',
 *   title: 'Hobby Name',
 *   description: 'Description',
 *   icon: 'Emoji icon',
 *   thumbnail: 'CSS gradient (optional)',
 *   tags: ['Tag1', 'Tag2'],
 *   size: 'featured'|'wide'|'small'
 * }
 */

const hobbies = [
    // Gaming - Featured
    {
        id: 'dota2',
        title: 'Dota 2',
        description: 'Ancient rank player. Main pos 4/5 support. 3000+ hours and counting...',
        icon: '🎮',
        thumbnail: 'linear-gradient(135deg, #e52d27 0%, #b31217 100%)',
        tags: ['Gaming', 'Strategy'],
        size: 'featured'
    },
    
    // Cooking - Wide
    {
        id: 'cooking',
        title: 'Cooking',
        description: 'Love experimenting with Indonesian & Asian cuisines. Specialty: Nasi Goreng!',
        icon: '🍳',
        thumbnail: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
        tags: ['Food', 'Creative'],
        size: 'wide'
    },
    
    // Small hobbies
    {
        id: 'photography',
        title: 'Photography',
        description: 'Street & landscape shots',
        icon: '📷',
        tags: ['Art'],
        size: 'small'
    },
    {
        id: 'football',
        title: 'Football',
        description: 'Man United fan!',
        icon: '⚽',
        tags: ['Sports'],
        size: 'small'
    },
    {
        id: 'f1',
        title: 'F1',
        description: 'Tifosi 🇮🇹',
        icon: '🏎️',
        tags: ['Sports'],
        size: 'small'
    },
    {
        id: 'coffee',
        title: 'Coffee',
        description: 'V60 enthusiast',
        icon: '☕',
        tags: ['Food'],
        size: 'small'
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { hobbies };
}
