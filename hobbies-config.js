/**
 * Hobbies Configuration
 * =====================
 * Add new hobbies here!
 * 
 * Format:
 * {
 *   id: 'unique-id',
 *   title: 'Hobby Name',
 *   description: 'Description',
 *   icon: 'Emoji icon',
 *   thumbnail: 'hobbies/images/my-hobby.jpg' OR 'linear-gradient(...)'
 * }
 * 
 * Images: Store in hobbies/images/ folder
 */

const hobbies = [
    {
        id: 'dota2',
        title: 'Dota 2',
        description: 'Ancient rank player. Main pos 4/5 support. 3000+ hours and counting...',
        icon: '🎮',
        thumbnail: 'linear-gradient(135deg, #e52d27 0%, #b31217 100%)'
    },
    {
        id: 'cooking',
        title: 'Cooking',
        description: 'Love experimenting with Indonesian & Asian cuisines. Specialty: Nasi Goreng!',
        icon: '🍳',
        thumbnail: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
    },
    {
        id: 'photography',
        title: 'Photography',
        description: 'Street & landscape shots. Always looking for the perfect lighting.',
        icon: '📷',
        thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        id: 'football',
        title: 'Football',
        description: 'Manchester United fan since childhood. Glory glory Man United!',
        icon: '⚽',
        thumbnail: 'linear-gradient(135deg, #DA291C 0%, #000000 100%)'
    },
    {
        id: 'f1',
        title: 'Formula 1',
        description: 'Tifosi 🇮🇹 - Supporting Ferrari through the ups and downs!',
        icon: '🏎️',
        thumbnail: 'linear-gradient(135deg, #DC0000 0%, #FFD800 100%)'
    },
    {
        id: 'coffee',
        title: 'Coffee',
        description: 'V60 enthusiast. Currently exploring single origin beans from Indonesia.',
        icon: '☕',
        thumbnail: 'linear-gradient(135deg, #6F4E37 0%, #C4A77D 100%)'
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { hobbies };
}
