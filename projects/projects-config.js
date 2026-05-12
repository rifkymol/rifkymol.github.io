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
 *   role: 'Your role or contribution',
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
        id: 'woowa',
        title: 'Woo-wa',
        description: 'WooCommerce WhatsApp notification plugin that helps small and medium businesses send order updates and automated reminders.',
        role: 'Built the WordPress/Elementor website and contributed to plugin development.',
        thumbnail: 'projects/images/woo-wa.png',
        tags: ['WordPress', 'WooCommerce', 'Plugin'],
        link: 'https://www.woo-wa.com',
    },
    {
        id: 'workflow',
        title: 'Workflow',
        description: 'Real-time warehouse approval system for an internal logistics management workflow.',
        role: 'Worked on backend services with Express.js and MySQL.',
        thumbnail: 'projects/images/workflow.png',
        tags: ['Next.js', 'Express.js', 'MySQL'],
    },
    {
        id: 'evo-gym',
        title: 'Evo Gym',
        description: 'Responsive frontend template for a gym business website with a polished marketing layout.',
        role: 'Built the interface with React, TypeScript, and Tailwind CSS.',
        thumbnail: 'projects/images/evo-gym.png',
        tags: ['React.js', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/rifkymol/gym-typescript-react-tailwindcss',
        link: 'https://gym-typescript-react-tailwindcss.pages.dev/'
    },
    {
        id: 'resepkan',
        title: 'Resepkan',
        description: 'Recipe organizer web app for saving, browsing, and managing favorite cooking ideas.',
        role: 'Built with Laravel and Vue.js.',
        thumbnail: 'projects/images/resepkan.png',
        tags: ['Laravel', 'Vue.js'],
    },
    {
        id: 'f1-leaderboard',
        title: 'F1 Leaderboard',
        description: 'Formula 1 standings dashboard powered by motorsport data and presented in Streamlit.',
        role: 'Built data display flow with Python and Streamlit.',
        thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        tags: ['API', 'Python', 'Streamlit'],
    },
    {
        id: 'portfolio-website',
        title: 'Portfolio Website',
        description: 'This static personal website, organized around projects, writing, reading, and photography.',
        role: 'Built with config-driven content, modular CSS, and vanilla JavaScript.',
        thumbnail: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        tags: ['HTML', 'CSS', 'JS'],
        github: 'https://github.com/rifkymol/personal-website'
    },
    {
        id: 'motionboard',
        title: 'MotionBoard',
        description: 'Business intelligence platform work for a motorcycle company in Indonesia.',
        role: 'Helped develop front-end features and improve user experience.',
        thumbnail: 'projects/images/motionboard.png',
        tags: ['Business Intelligence'],
        link: 'https://www.wingarc.com/en/product/motionboard/',
    },
];

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects };
}
