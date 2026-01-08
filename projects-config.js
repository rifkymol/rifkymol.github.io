/**
 * Projects Configuration
 * ======================
 * Add new projects here!
 * 
 * Format:
 * {
 *   id: 'unique-id',
 *   title: 'Project Name',
 *   description: 'Short description',
 *   thumbnail: 'projects/images/my-project.jpg' OR 'linear-gradient(...)',
 *   tags: ['Tag1', 'Tag2'],
 *   link: 'https://...',           // Optional: project URL
 *   github: 'https://github.com/...' // Optional: repo URL
 * }
 * 
 * Images: Store in projects/images/ folder
 */

const projects = [
    {
        id: 'ecommerce-platform',
        title: 'E-Commerce Platform',
        description: 'Full-stack web application built with modern technologies. Features user auth, real-time inventory, and seamless checkout.',
        thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        tags: ['React', 'Node.js', 'MongoDB'],
        link: '#',
        github: 'https://github.com/rifkymol'
    },
    {
        id: 'task-manager',
        title: 'Task Manager',
        description: 'Real-time collaboration tool for managing tasks and projects with team members.',
        thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        tags: ['Vue.js', 'Firebase']
    },
    {
        id: 'weather-app',
        title: 'Weather App',
        description: 'Beautiful data visualization app showing weather forecasts with charts and maps.',
        thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        tags: ['API', 'JavaScript']
    },
    {
        id: 'portfolio-website',
        title: 'Portfolio Website',
        description: 'This website! Clean design with smooth animations and dynamic content loading.',
        thumbnail: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        tags: ['HTML', 'CSS', 'JS'],
        github: 'https://github.com/rifkymol/personal-website'
    }
];

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects };
}
