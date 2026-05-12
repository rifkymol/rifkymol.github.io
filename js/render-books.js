function loadAllBooks() {
    const container = document.getElementById('books-grid');
    if (!container) return;

    if (typeof books === 'undefined' || books.length === 0) {
        container.innerHTML = '<p>No books yet.</p>';
        return;
    }

    container.innerHTML = books.map(book => {
        const statusMeta = getBookStatusMeta(book.status);
        const thumbnailStyle = getThumbnailStyle(book.thumbnail);
        const rating = renderStars(book.rating);

        return `
            <article class="book-card" data-status="${escapeAttribute(book.status)}">
                <div class="book-thumbnail" style="${thumbnailStyle}" role="img" aria-label="${escapeAttribute(book.title)} book cover"></div>
                <div class="book-card-content">
                    <span class="book-status-tag ${escapeAttribute(book.status)}">${statusMeta.icon} ${statusMeta.label}</span>
                    <h3>${escapeHTML(book.title)}</h3>
                    <p class="book-author">by ${escapeHTML(book.author)}</p>
                    ${book.note ? `<p class="book-note">${escapeHTML(book.note)}</p>` : ''}
                    ${rating ? `<p class="book-rating" aria-label="Rating ${escapeAttribute(book.rating)} out of 5">${rating}</p>` : ''}
                </div>
            </article>
        `;
    }).join('');

    attachBookFilterListeners();
}

function attachBookFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(item => item.classList.remove('active'));
            button.classList.add('active');

            bookCards.forEach(card => {
                const status = card.getAttribute('data-status');
                card.classList.toggle('hidden', filter !== 'all' && status !== filter);
            });
        });
    });
}
