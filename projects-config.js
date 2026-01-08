/**
 * Projects Configuration
 * ======================
 * Tambah project baru? Edit array di bawah ini!
 * 
 * Format:
 * {
 *   id: 'unique-id',
 *   title: 'Project Name',
 *   description: 'Short description',
 *   thumbnail: 'CSS gradient or image URL',
 *   tags: ['Tag1', 'Tag2'],
 *   link: 'https://...',           // Optional: project URL
 *   github: 'https://github.com/...', // Optional: repo URL
 *   featured: true/false,          // Show on homepage?
 *   size: 'featured'|'wide'|'small' // Card size for bento layout
 * }
 */

const projects = [
    {
        id: 'ecommerce-platform',
        title: 'E-Commerce Platform',
        description: 'Full-stack web application built with modern technologies. Features user auth, real-time inventory, and seamless checkout.',
        thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        tags: ['React', 'Node.js', 'MongoDB'],
        link: '#',
        github: 'https://github.com/rifkymol',
        featured: true,
        size: 'featured'
    },
    {
        id: 'task-manager',
        title: 'Task Manager',
        description: 'Real-time collab tool',
        thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        tags: ['Vue.js'],
        featured: true,
        size: 'small'
    },
    {
        id: 'weather-app',
        title: 'Weather App',
        description: 'Data visualization',
        thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        tags: ['API'],
        featured: true,
        size: 'small'
    },
    {
        id: 'portfolio-website',
        title: 'Portfolio Website',
        description: 'This website! Clean design with smooth animations.',
        thumbnail: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        tags: ['HTML', 'CSS', 'JS'],
        github: 'https://github.com/rifkymol/personal-website',
        featured: true,
        size: 'wide'
    }
];

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects };
}
