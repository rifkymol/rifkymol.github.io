# Clean Blog URL Tanpa Hash + Share Artikel

## Checklist
- [x] Review current static site structure and previous lessons.
- [x] Add blog slugs and route helpers for clean blog URLs.
- [x] Update blog list/detail rendering to use `/blog` and `/blog/{slug}`.
- [x] Add article share button with Web Share API and clipboard fallback.
- [x] Add lightweight share/header styles.
- [x] Add Azure Static Web Apps fallback config.
- [x] Verify home, blog list, blog detail, direct route fallback, missing slug, back link, and share fallback behavior.

## Verification
- `node --check` passed for all JavaScript files.
- `staticwebapp.config.json` parsed successfully as JSON.
- Blog config validation passed: every post has a unique slug and existing Markdown file.
- Search check found no remaining `#blog`, `data-post`, or `updateHash` usage.
- Local rewrite server returned `200` for `/`, `/blog`, `/blog/introduction-to-artificial-intelligence`, and `/blog/slug-yang-tidak-ada`.
- Local rewrite server confirmed nested blog routes receive `index.html` with `<base href="/">`.
- Share handler unit check passed for both `navigator.share` and clipboard fallback, including `Link copied` feedback.
- Visual browser automation was not available from the exposed tools/PATH in this session, so final click-through visual verification was covered by route and handler checks instead.

## Review
- Blog routing now uses clean paths for `/blog` and `/blog/{slug}` while keeping non-blog tabs on the existing hash behavior.
- Blog cards use `slug` as the URL identifier, and article detail loading now receives the full post object.
- Article detail headers now include a `Share` button with native Web Share support and clipboard fallback.
- Azure Static Web Apps now has a navigation fallback so direct blog routes refresh to `index.html`.
