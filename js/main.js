document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    initNavigation();
    initLightbox();

    loadBlogPosts();
    loadRecentProjects();
    loadRecentBlogs();
    loadRecentPhotos();
    loadAllProjects();
    loadAllBooks();
    loadPhotographyGallery();

    const backButton = document.getElementById('back-to-blog');
    if (backButton) {
        backButton.addEventListener('click', showBlogList);
    }
});
