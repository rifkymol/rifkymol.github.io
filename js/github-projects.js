const GITHUB_USERNAME = 'rifkymol';
const GITHUB_STARRED_API = 'https://api.github.com/users/rifkymol/starred?per_page=100';
const GITHUB_OWN_STARRED_CACHE_KEY = 'github_own_starred_projects_cache_v3';
const GITHUB_OWN_STARRED_CACHE_TTL = 6 * 60 * 60 * 1000;
const GITHUB_PROJECT_ROLE = 'Built and maintained as a personal GitHub project.';
const GITHUB_PROJECT_FALLBACK_DESCRIPTION = 'GitHub repository by Rifky Maulana.';
const GITHUB_STACK_TAG_LIMIT = 10;
const repoFileIndexCache = new Map();
const repoFileContentCache = new Map();

const GITHUB_REPO_TECH_STACK = {
    sikasir: [
        'React 18',
        'Vite 5',
        'React Router',
        'Axios',
        'SweetAlert2',
        'CSS Modules',
        'Python 3.10+',
        'Django',
        'Django REST Framework',
        'SQLite',
        'PostgreSQL',
        'openpyxl',
        'pandas',
        'JWT'
    ],
    resepkan: ['Laravel', 'Vue.js', 'MySQL'],
    'gym-typescript-react-tailwindcss': ['React.js', 'TypeScript', 'Tailwind CSS'],
    'f1-leaderboard': ['Python', 'Streamlit', 'API'],
    'workflow-express': ['Node.js', 'Express.js', 'Sequelize', 'SQL Server']
};

const TECH_LABEL_MAP = {
    api: 'API',
    axios: 'Axios',
    css: 'CSS',
    cssmodules: 'CSS Modules',
    django: 'Django',
    djangorestframework: 'Django REST Framework',
    djangorestframeworksimplejwt: 'JWT',
    drf: 'Django REST Framework',
    expressjs: 'Express.js',
    'express.js': 'Express.js',
    fastapi: 'FastAPI',
    flask: 'Flask',
    html: 'HTML',
    inertia: 'Inertia.js',
    'inertia.js': 'Inertia.js',
    inertiajs: 'Inertia.js',
    javascript: 'JavaScript',
    js: 'JavaScript',
    jwt: 'JWT',
    laravel: 'Laravel',
    mysql: 'MySQL',
    next: 'Next.js',
    nextjs: 'Next.js',
    'next.js': 'Next.js',
    nodejs: 'Node.js',
    'node.js': 'Node.js',
    nuxt: 'Nuxt',
    openpyxl: 'openpyxl',
    pandas: 'pandas',
    php: 'PHP',
    postgresql: 'PostgreSQL',
    python: 'Python',
    react: 'React.js',
    reactjs: 'React.js',
    'react.js': 'React.js',
    reactrouter: 'React Router',
    reactrouterdom: 'React Router',
    sequelize: 'Sequelize',
    sqlite: 'SQLite',
    sqlserver: 'SQL Server',
    streamlit: 'Streamlit',
    sweetalert2: 'SweetAlert2',
    tailwind: 'Tailwind CSS',
    tailwindcss: 'Tailwind CSS',
    typescript: 'TypeScript',
    ts: 'TypeScript',
    vite: 'Vite',
    vue: 'Vue.js',
    vuejs: 'Vue.js',
    'vue.js': 'Vue.js'
};

const PACKAGE_DEPENDENCY_LABELS = {
    react: 'React',
    vite: 'Vite',
    'react-router-dom': 'React Router',
    axios: 'Axios',
    sweetalert2: 'SweetAlert2',
    tailwindcss: 'Tailwind CSS',
    typescript: 'TypeScript',
    vue: 'Vue.js',
    next: 'Next.js',
    nuxt: 'Nuxt',
    '@inertiajs/react': 'Inertia.js',
    '@inertiajs/vue3': 'Inertia.js'
};

const PYTHON_DEPENDENCY_LABELS = {
    django: 'Django',
    djangorestframework: 'Django REST Framework',
    'djangorestframework-simplejwt': 'JWT',
    fastapi: 'FastAPI',
    flask: 'Flask',
    openpyxl: 'openpyxl',
    pandas: 'pandas',
    streamlit: 'Streamlit'
};

const COMPOSER_DEPENDENCY_LABELS = {
    'inertiajs/inertia-laravel': 'Inertia.js',
    'laravel/framework': 'Laravel'
};

const README_TECH_PATTERNS = [
    ['React 18', /\breact\s*(?:18|v18|\^18)/i],
    ['React.js', /\breact(?:\.js)?\b/i],
    ['Vite 5', /\bvite\s*(?:5|v5|\^5)/i],
    ['Vite', /\bvite\b/i],
    ['React Router', /\breact[-\s]?router(?:[-\s]?dom)?\b/i],
    ['Axios', /\baxios\b/i],
    ['SweetAlert2', /\bsweetalert2\b/i],
    ['CSS Modules', /\bcss\s*modules?\b/i],
    ['Python 3.10+', /\bpython\s*3\.10\+?/i],
    ['Python', /\bpython\b/i],
    ['Django REST Framework', /\bdjango\s+rest\s+framework\b|\bdrf\b/i],
    ['Django', /\bdjango\b/i],
    ['SQLite', /\bsqlite\b/i],
    ['PostgreSQL', /\bpostgres(?:ql)?\b/i],
    ['openpyxl', /\bopenpyxl\b/i],
    ['pandas', /\bpandas\b/i],
    ['JWT', /\bjwt\b|\bsimplejwt\b/i],
    ['Vue.js', /\bvue(?:\.js|js)?\b/i],
    ['Next.js', /\bnext(?:\.js|js)?\b/i],
    ['Nuxt', /\bnuxt\b/i],
    ['Tailwind CSS', /\btailwind(?:\s*css)?\b/i],
    ['TypeScript', /\btypescript\b/i],
    ['Laravel', /\blaravel\b/i],
    ['MySQL', /\bmysql\b/i],
    ['Streamlit', /\bstreamlit\b/i],
    ['FastAPI', /\bfastapi\b/i],
    ['Flask', /\bflask\b/i]
];

const GENERIC_TOPIC_LABELS = new Set([
    'app',
    'application',
    'backend',
    'frontend',
    'portfolio',
    'project',
    'web',
    'website'
]);

function formatRepoName(name) {
    return String(name || '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, char => char.toUpperCase()) || 'Untitled Project';
}

function generateDeterministicGradient(seed) {
    const palettes = [
        ['#0f766e', '#22c55e'],
        ['#2563eb', '#06b6d4'],
        ['#7c3aed', '#db2777'],
        ['#dc2626', '#f97316'],
        ['#334155', '#14b8a6'],
        ['#1d4ed8', '#9333ea'],
        ['#15803d', '#65a30d'],
        ['#be123c', '#f59e0b']
    ];
    const value = String(seed || 'project');
    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
        hash = ((hash << 5) - hash) + value.charCodeAt(index);
        hash |= 0;
    }

    const [start, end] = palettes[Math.abs(hash) % palettes.length];
    return `linear-gradient(135deg, ${start} 0%, ${end} 100%)`;
}

function getTechLabelKey(label) {
    return String(label || '').toLowerCase().replace(/[^a-z0-9+#.]/g, '');
}

function getTechDedupeKey(label) {
    const key = getTechLabelKey(label);

    if (/^react(?:\.js)?$|^react\d+$/.test(key)) return 'react';
    if (/^vite$|^vite\d+$/.test(key)) return 'vite';
    if (/^python$|^python\d/.test(key)) return 'python';

    return key;
}

function formatTechLabel(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';

    const compactKey = getTechLabelKey(raw);
    if (TECH_LABEL_MAP[compactKey]) return TECH_LABEL_MAP[compactKey];

    return raw
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, char => char.toUpperCase());
}

function dedupeTechStack(tags, options = {}) {
    const allowGeneric = Boolean(options.allowGeneric);
    const seen = new Set();
    const deduped = [];

    tags.forEach(tag => {
        const label = formatTechLabel(tag);
        const key = getTechDedupeKey(label);

        if (!label || !key || seen.has(key)) return;
        if (!allowGeneric && GENERIC_TOPIC_LABELS.has(key)) return;

        seen.add(key);
        deduped.push(label);
    });

    return deduped;
}

function getDependencyVersionLabel(baseLabel, version) {
    const majorMatch = String(version || '').match(/(\d+)/);
    if (!majorMatch) return formatTechLabel(baseLabel);

    if (baseLabel === 'React' || baseLabel === 'Vite') {
        return `${baseLabel} ${majorMatch[1]}`;
    }

    return formatTechLabel(baseLabel);
}

function getPackageDependencies(packageJson) {
    return {
        ...(packageJson?.dependencies || {}),
        ...(packageJson?.devDependencies || {}),
        ...(packageJson?.peerDependencies || {}),
        ...(packageJson?.optionalDependencies || {})
    };
}

function detectStackFromPackageJson(packageJson) {
    const dependencies = getPackageDependencies(packageJson);
    const tags = [];

    Object.entries(PACKAGE_DEPENDENCY_LABELS).forEach(([dependencyName, label]) => {
        if (dependencies[dependencyName]) {
            tags.push(getDependencyVersionLabel(label, dependencies[dependencyName]));
        }
    });

    return dedupeTechStack(tags);
}

function detectStackFromRequirementsTxt(text) {
    const normalizedText = String(text || '').toLowerCase();
    const tags = [];

    Object.entries(PYTHON_DEPENDENCY_LABELS).forEach(([dependencyName, label]) => {
        const pattern = new RegExp(`(^|\\n)\\s*${dependencyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (pattern.test(normalizedText)) tags.push(label);
    });

    return dedupeTechStack(tags);
}

function detectStackFromComposerJson(composerJson) {
    const dependencies = {
        ...(composerJson?.require || {}),
        ...(composerJson?.['require-dev'] || {})
    };
    const tags = [];

    Object.entries(COMPOSER_DEPENDENCY_LABELS).forEach(([dependencyName, label]) => {
        if (dependencies[dependencyName]) tags.push(label);
    });

    if (Object.keys(dependencies).some(name => name.includes('vue'))) tags.push('Vue.js');

    return dedupeTechStack(tags);
}

function getReadmeTechSection(text) {
    const lines = String(text || '').split(/\r?\n/);
    const start = lines.findIndex(line => /^(#{1,6}\s*)?(tech stack|technology|technologies|teknologi|stack|built with)\b/i.test(line.trim()));
    if (start === -1) return String(text || '');

    const section = [];
    for (let index = start; index < lines.length; index += 1) {
        if (index > start && /^#{1,6}\s+\S/.test(lines[index])) break;
        section.push(lines[index]);
    }

    return section.join('\n');
}

function detectStackFromReadme(text) {
    const section = getReadmeTechSection(text);
    const tags = [];

    README_TECH_PATTERNS.forEach(([label, pattern]) => {
        if (pattern.test(section)) tags.push(label);
    });

    return dedupeTechStack(tags);
}

function decodeBase64Content(content) {
    const normalized = String(content || '').replace(/\s/g, '');

    if (typeof Buffer !== 'undefined') {
        return Buffer.from(normalized, 'base64').toString('utf8');
    }

    return decodeURIComponent(Array.prototype.map.call(atob(normalized), char => {
        return `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`;
    }).join(''));
}

function getRepoApiUrl(repo, suffix) {
    const owner = encodeURIComponent(repo?.owner?.login || GITHUB_USERNAME);
    const repoName = encodeURIComponent(repo?.name || '');
    return `https://api.github.com/repos/${owner}/${repoName}${suffix}`;
}

async function fetchRepoFileIndex(repo) {
    const cacheKey = `${repo?.owner?.login || GITHUB_USERNAME}/${repo?.name || ''}`;
    if (repoFileIndexCache.has(cacheKey)) return repoFileIndexCache.get(cacheKey);

    const promise = (async () => {
        try {
            const branch = encodeURIComponent(repo?.default_branch || 'main');
            const response = await fetch(getRepoApiUrl(repo, `/git/trees/${branch}?recursive=1`));
            if (!response.ok) return null;

            const tree = await response.json();
            if (!Array.isArray(tree?.tree)) return null;

            return tree.tree
                .filter(item => item?.type === 'blob' && item?.path)
                .map(item => item.path);
        } catch (error) {
            return null;
        }
    })();

    repoFileIndexCache.set(cacheKey, promise);
    return promise;
}

function findRepoFilePath(paths, requestedPath) {
    if (!Array.isArray(paths) || paths.length === 0) return requestedPath;

    const requested = String(requestedPath || '').toLowerCase();
    const requestedName = requested.split('/').pop();
    const exact = paths.find(path => path.toLowerCase() === requested);
    if (exact) return exact;

    const rootMatch = paths.find(path => path.toLowerCase() === requestedName);
    if (rootMatch) return rootMatch;

    const nestedMatch = paths.find(path => path.toLowerCase().split('/').pop() === requestedName);
    return nestedMatch || '';
}

async function fetchRepoFile(repo, path) {
    try {
        const cacheKey = `${repo?.owner?.login || GITHUB_USERNAME}/${repo?.name || ''}/${path}`;
        if (repoFileContentCache.has(cacheKey)) return repoFileContentCache.get(cacheKey);

        const fileIndex = await fetchRepoFileIndex(repo);
        const actualPath = fileIndex ? findRepoFilePath(fileIndex, path) : path;
        if (!actualPath) return '';

        const promise = (async () => {
            const encodedPath = String(actualPath || '')
                .split('/')
                .map(segment => encodeURIComponent(segment))
                .join('/');
            const response = await fetch(getRepoApiUrl(repo, `/contents/${encodedPath}`));

            if (response.status === 404) return '';
            if (!response.ok) return '';

            const file = await response.json();
            if (file?.encoding === 'base64' && file?.content) {
                return decodeBase64Content(file.content);
            }

            if (file?.download_url) {
                const rawResponse = await fetch(file.download_url);
                return rawResponse.ok ? rawResponse.text() : '';
            }

            return '';
        })();

        repoFileContentCache.set(cacheKey, promise);
        return promise;
    } catch (error) {
        return '';
    }
}

async function fetchGithubLanguages(repo) {
    try {
        const response = await fetch(getRepoApiUrl(repo, '/languages'));
        if (!response.ok) return [];

        const languages = await response.json();
        if (!languages || typeof languages !== 'object' || Array.isArray(languages)) return [];

        return Object.entries(languages)
            .sort(([, a], [, b]) => b - a)
            .map(([language]) => formatTechLabel(language));
    } catch (error) {
        return [];
    }
}

async function detectStackFromDependencyFiles(repo) {
    const tags = [];
    const packageJsonText = await fetchRepoFile(repo, 'package.json');

    if (packageJsonText) {
        try {
            tags.push(...detectStackFromPackageJson(JSON.parse(packageJsonText)));
        } catch (error) {
            // Ignore malformed dependency files and continue with other signals.
        }
    }

    const composerJsonText = await fetchRepoFile(repo, 'composer.json');
    if (composerJsonText) {
        try {
            tags.push(...detectStackFromComposerJson(JSON.parse(composerJsonText)));
        } catch (error) {
            // Ignore malformed dependency files and continue with other signals.
        }
    }

    const pythonFiles = await Promise.all([
        fetchRepoFile(repo, 'requirements.txt'),
        fetchRepoFile(repo, 'pyproject.toml'),
        fetchRepoFile(repo, 'Pipfile')
    ]);
    pythonFiles.forEach(text => tags.push(...detectStackFromRequirementsTxt(text)));

    const viteConfigs = await Promise.all([
        fetchRepoFile(repo, 'vite.config.js'),
        fetchRepoFile(repo, 'vite.config.ts')
    ]);
    const viteConfig = viteConfigs.find(Boolean);
    if (viteConfig) tags.push('Vite');

    const [artisan, managePy] = await Promise.all([
        fetchRepoFile(repo, 'artisan'),
        fetchRepoFile(repo, 'manage.py')
    ]);
    if (artisan) tags.push('Laravel');
    if (managePy) tags.push('Django');

    return dedupeTechStack(tags);
}

async function detectStackFromReadmeFiles(repo) {
    return detectStackFromReadme(await fetchRepoReadme(repo));
}

async function fetchRepoReadme(repo) {
    const readmeFiles = await Promise.all([
        fetchRepoFile(repo, 'README.md'),
        fetchRepoFile(repo, 'readme.md'),
        fetchRepoFile(repo, 'README.MD')
    ]);

    return readmeFiles.find(Boolean) || '';
}

function buildTopicStack(repo) {
    return dedupeTechStack(Array.isArray(repo?.topics) ? repo.topics : []);
}

async function buildTechStack(repo) {
    const repoName = String(repo?.name || '').trim();
    const override = GITHUB_REPO_TECH_STACK[repoName];
    if (override) return [...override];

    const [dependencyStack, readmeStack, languageStack] = await Promise.all([
        detectStackFromDependencyFiles(repo),
        detectStackFromReadmeFiles(repo),
        fetchGithubLanguages(repo)
    ]);
    const topicStack = buildTopicStack(repo);

    return dedupeTechStack([
        ...dependencyStack,
        ...readmeStack,
        ...languageStack,
        ...topicStack
    ]).slice(0, GITHUB_STACK_TAG_LIMIT);
}

function buildTags(language, topics) {
    return dedupeTechStack([language, ...(Array.isArray(topics) ? topics : [])]).slice(0, GITHUB_STACK_TAG_LIMIT);
}

async function normalizeGithubRepo(repo) {
    const name = String(repo?.name || '').trim();
    const homepage = String(repo?.homepage || '').trim();
    const title = formatRepoName(name);
    const tags = await buildTechStack(repo);

    return {
        id: `github-${name}`,
        title,
        description: repo?.description || GITHUB_PROJECT_FALLBACK_DESCRIPTION,
        role: GITHUB_PROJECT_ROLE,
        thumbnail: generateDeterministicGradient(name),
        tags,
        link: homepage,
        github: repo?.html_url || '',
        updatedAt: repo?.updated_at || ''
    };
}

function getFallbackProjects() {
    if (typeof fallbackProjects !== 'undefined' && Array.isArray(fallbackProjects)) {
        return [...fallbackProjects];
    }

    if (typeof projects !== 'undefined' && Array.isArray(projects)) {
        return [...projects];
    }

    return [];
}

function normalizeRepoName(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/^github-/, '')
        .replace(/[^a-z0-9._-]+/g, '');
}

function normalizeGithubUrl(url) {
    return String(url || '').trim().toLowerCase().replace(/\/+$/, '');
}

function getGithubRepoNameFromUrl(url) {
    const match = String(url || '').toLowerCase().match(/github\.com\/[^/]+\/([^/#?]+)/);
    return match ? normalizeRepoName(match[1]) : '';
}

function getManualProjectKeys(manualProjects) {
    const githubUrls = new Set();
    const repoNames = new Set();

    manualProjects.forEach(project => {
        const githubUrl = normalizeGithubUrl(project?.github);
        const repoNameFromUrl = getGithubRepoNameFromUrl(project?.github);
        const repoNameFromId = normalizeRepoName(project?.id);
        const explicitRepoName = normalizeRepoName(project?.githubRepoName);

        if (githubUrl) githubUrls.add(githubUrl);
        if (repoNameFromUrl) repoNames.add(repoNameFromUrl);
        if (repoNameFromId) repoNames.add(repoNameFromId);
        if (explicitRepoName) repoNames.add(explicitRepoName);
    });

    return { githubUrls, repoNames };
}

function isDuplicateProject(githubProject, manualProjectKeys) {
    const githubUrl = normalizeGithubUrl(githubProject?.github);
    const repoNameFromUrl = getGithubRepoNameFromUrl(githubProject?.github);
    const repoNameFromId = normalizeRepoName(githubProject?.id);

    return manualProjectKeys.githubUrls.has(githubUrl) ||
        manualProjectKeys.repoNames.has(repoNameFromUrl) ||
        manualProjectKeys.repoNames.has(repoNameFromId);
}

function dedupeProjects(manualProjects, githubProjects) {
    const manual = Array.isArray(manualProjects) ? [...manualProjects] : [];
    const github = Array.isArray(githubProjects) ? githubProjects : [];
    const manualProjectKeys = getManualProjectKeys(manual);
    const seenGithubKeys = new Set();

    const dedupedGithub = github.filter(project => {
        if (!project || !project.id || !project.github) return false;
        if (isDuplicateProject(project, manualProjectKeys)) return false;

        const key = normalizeGithubUrl(project.github) || normalizeRepoName(project.id);
        if (!key || seenGithubKeys.has(key)) return false;

        seenGithubKeys.add(key);
        return true;
    });

    return [...manual, ...dedupedGithub];
}

function getCachedGithubProjects() {
    try {
        const raw = window.localStorage.getItem(GITHUB_OWN_STARRED_CACHE_KEY);
        if (!raw) return null;

        const cached = JSON.parse(raw);
        if (!cached || !Array.isArray(cached.projects) || !cached.timestamp) return null;
        if (Date.now() - cached.timestamp > GITHUB_OWN_STARRED_CACHE_TTL) return null;

        return cached.projects;
    } catch (error) {
        return null;
    }
}

function setCachedGithubProjects(projectList) {
    try {
        window.localStorage.setItem(GITHUB_OWN_STARRED_CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            projects: projectList
        }));
    } catch (error) {
        // localStorage can be unavailable in private/offline contexts.
    }
}

function isOwnStarredRepo(repo) {
    return Boolean(
        repo &&
        repo.owner &&
        repo.owner.login &&
        repo.owner.login.toLowerCase() === GITHUB_USERNAME &&
        !repo.archived &&
        !repo.fork
    );
}

function getNextPageUrl(linkHeader) {
    if (!linkHeader) return '';

    const nextLink = linkHeader
        .split(',')
        .map(part => part.trim())
        .find(part => part.includes('rel="next"'));
    const match = nextLink && nextLink.match(/<([^>]+)>/);

    return match ? match[1] : '';
}

async function fetchAllStarredRepos() {
    const repos = [];
    let url = GITHUB_STARRED_API;

    while (url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GitHub API failed with status ${response.status}`);
        }

        const pageRepos = await response.json();
        if (!Array.isArray(pageRepos)) {
            throw new Error('GitHub API returned an invalid starred repository list');
        }

        repos.push(...pageRepos);
        url = getNextPageUrl(response.headers.get('Link'));

        if (!url && pageRepos.length === 100) {
            const currentUrl = new URL(response.url);
            const currentPage = Number(currentUrl.searchParams.get('page') || '1');
            currentUrl.searchParams.set('page', String(currentPage + 1));
            url = currentUrl.toString();
        }
    }

    return repos;
}

async function fetchOwnStarredGithubProjects() {
    const repos = await fetchAllStarredRepos();
    const ownRepos = repos
        .filter(isOwnStarredRepo)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    const settled = await Promise.allSettled(ownRepos.map(repo => normalizeGithubRepo(repo)));
    const normalized = settled
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

    return normalized.filter(project => project.id && project.title && project.github);
}

async function loadProjectsData() {
    const manualProjects = getFallbackProjects();
    const cached = getCachedGithubProjects();

    if (cached && cached.length > 0) {
        projects = dedupeProjects(manualProjects, cached);
        return projects;
    }

    try {
        const starredProjects = await fetchOwnStarredGithubProjects();
        setCachedGithubProjects(starredProjects);
        projects = dedupeProjects(manualProjects, starredProjects);
        return projects;
    } catch (error) {
        projects = cached && cached.length > 0
            ? dedupeProjects(manualProjects, cached)
            : manualProjects;
        return projects;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GITHUB_USERNAME,
        GITHUB_STARRED_API,
        GITHUB_OWN_STARRED_CACHE_KEY,
        GITHUB_OWN_STARRED_CACHE_TTL,
        GITHUB_REPO_TECH_STACK,
        formatRepoName,
        generateDeterministicGradient,
        formatTechLabel,
        dedupeTechStack,
        detectStackFromPackageJson,
        detectStackFromRequirementsTxt,
        detectStackFromComposerJson,
        detectStackFromReadme,
        fetchGithubLanguages,
        fetchRepoFile,
        fetchRepoReadme,
        buildTechStack,
        buildTags,
        isOwnStarredRepo,
        normalizeGithubRepo,
        getCachedGithubProjects,
        setCachedGithubProjects,
        fetchAllStarredRepos,
        fetchOwnStarredGithubProjects,
        dedupeProjects,
        loadProjectsData
    };
}
