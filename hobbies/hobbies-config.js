/**
 * Hobbies Configuration
 * =====================
 * Add new hobbies here!
 * 
 * Format for regular hobbies:
 * {
 *   id: 'unique-id',
 *   title: 'Hobby Name',
 *   description: 'Description',
 *   icon: 'Emoji icon',
 *   thumbnail: 'hobbies/images/my-hobby.jpg' OR 'linear-gradient(...)'
 * }
 * 
 * Format for gallery hobbies (like photography):
 * {
 *   id: 'photography',
 *   title: 'Photography',
 *   description: 'Description',
 *   icon: '📷',
 *   thumbnail: 'hobbies/images/photo.jpg',
 *   type: 'gallery',
 *   gallery: [
 *     { src: 'hobbies/images/photo1.jpg', caption: 'Optional caption', tags: ['Street', 'Night'] },
 *     { src: 'hobbies/images/photo2.jpg' }
 *   ]
 * }
 * 
 * Images: Store in hobbies/images/ folder
 */

const hobbies = [
    {
        id: 'gaming',
        title: 'Gaming',
        description: 'Competitive gamer and casual player. Favorite genres: RPG, Strategy, FPS.',
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
        thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        type: 'gallery',
        gallery: [
            // Add your photos here! Example:
            { src: 'hobbies/images/20250719_151134.jpg', caption: 'Cafe', tags: ['Cafe'] },
            { src: 'hobbies/images/Z.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/C.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/D.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/Z.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/A.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/G.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/H.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/I.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/J.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/K.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/L.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/M.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/N.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/O.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/P.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/Q.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/R.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/S.jpg', caption: '', tags: [''] },
            { src: 'hobbies/images/T.jpg', caption: '', tags: [''] },
            // { src: 'hobbies/images/landscape-1.jpg', caption: 'Mountain sunrise', tags: ['Landscape'] },
        ]
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
