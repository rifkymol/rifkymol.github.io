document.addEventListener('DOMContentLoaded', async () => {
    window.scrollTo(0, 0);

    initNavigation();
    initLightbox();

    await loadProjectsData();

    loadBlogPosts();
    loadRecentProjects();
    loadRecentBlogs();
    loadRecentPhotos();
    loadRecentBooks();
    loadAllProjects();
    loadAllBooks();
    loadPhotographyGallery();

    const backButton = document.getElementById('back-to-blog');
    if (backButton) {
        backButton.addEventListener('click', showBlogList);
    }
});
