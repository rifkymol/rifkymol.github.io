function renderProjectCard(project, options = {}) {
    const thumbnailStyle = getThumbnailStyle(project.thumbnail);
    const tags = Array.isArray(project.tags) ? project.tags : [];
    const hasLinks = Boolean(project.link || project.github);
    const links = options.includeLinks ? `
        <div class="project-links${hasLinks ? '' : ' project-links-empty'}">
            ${project.link ? `<a href="${escapeAttribute(project.link)}" class="project-link" target="_blank" rel="noopener noreferrer">View Project →</a>` : ''}
            ${project.github ? `<a href="${escapeAttribute(project.github)}" class="project-link github-link" target="_blank" rel="noopener noreferrer">GitHub →</a>` : ''}
            ${hasLinks ? '' : '<span class="project-link-muted">Private/internal project</span>'}
        </div>
    ` : '';

    return `
        <article class="project-card">
            <div class="project-thumbnail" style="${thumbnailStyle}" role="img" aria-label="${escapeAttribute(project.title)} thumbnail"></div>
            <div class="project-card-content">
                <h3>${escapeHTML(project.title)}</h3>
                <p>${escapeHTML(project.description)}</p>
                ${project.role ? `<p class="project-role">${escapeHTML(project.role)}</p>` : ''}
                <div class="tech-stack">
                    ${tags.map(tag => `<span class="tech-tag">${escapeHTML(tag)}</span>`).join('')}
                </div>
                ${links}
            </div>
        </article>
    `;
}

function loadRecentProjects() {
    const container = document.getElementById('recent-projects');
    if (!container) return;

    if (typeof projects === 'undefined' || projects.length === 0) {
        container.innerHTML = '<p>No projects yet.</p>';
        return;
    }

    container.innerHTML = projects
        .slice(0, 3)
        .map(project => renderProjectCard(project))
        .join('');
}

function loadAllProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    if (typeof projects === 'undefined' || projects.length === 0) {
        container.innerHTML = '<p>No projects yet.</p>';
        return;
    }

    container.innerHTML = projects
        .map(project => renderProjectCard(project, { includeLinks: true }))
        .join('');
}
