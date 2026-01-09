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
        id: 'motionboard',
        title: 'MotionBoard',
        description: 'MotionBoard is a BI tool that provides a single platform with all the functions you need to utilize data. Helped in developing front-end features and improving user experience for Astra Honda Motor',
        thumbnail: 'projects/images/motionboard.png',
        tags: ['Business Intelligence'],
        link: 'https://www.wingarc.com/en/product/motionboard/',
    },
    {
        id: 'workflow',
        title: 'Workflow',
        description: 'Built a real-time warehouse approval system as part of an internal logistics management tool to streamline operations and improve efficiency. working as a back-end developer using Express.js, and MySQL.',
        thumbnail: 'projects/images/workflow.png',
        tags: ['Next.js', 'Express.js', 'MySQL'],
    },
    {
        id: 'f1-leaderboard',
        title: 'F1 Leaderboard',
        description: 'A web app that displays the current Formula 1 season standings using the FastF1. Built with Python and streamlit.',
        thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        tags: ['API', 'Python', 'Streamlit'],
        github: ''
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
