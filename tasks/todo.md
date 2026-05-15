# Integrasi Blog Tab Dengan Medium RSS

## Checklist
- [x] Review current blog renderer/config and preserve existing working-tree changes.
- [x] Add cached Medium RSS-to-JSON fetch helper.
- [x] Render Blog tab from Medium RSS cards that open Medium in a new tab.
- [x] Render Home latest posts from the same cached Medium feed.
- [x] Add loading, empty, and error fallback states with Medium profile link.
- [x] Make stale `/blog/{slug}` routes fall back to the Medium-backed blog list for v1.
- [x] Run syntax, feed parsing, and local smoke verification.

## Verification
- Medium RSS proxy check returned `status=ok` with 1 item from `https://medium.com/feed/@rifkymol`.
- `node --check` passed for all JavaScript files.
- `git diff --check` passed with no whitespace errors.
- Medium parser check passed for excerpt stripping, image extraction, and encoded RSS proxy URL.
- Headless Edge check passed: `/` and `/blog` render Medium cards, external links point to Medium, and links use `target="_blank"` plus `rel="noopener noreferrer"`.
- Stale local article route check passed: `/blog/old-local-slug` falls back to `/blog` list view for v1.

## Review
- Blog tab and Home latest blog posts now use the Medium RSS feed for `@rifkymol` through `rss2json`.
- The feed request is cached in memory so Home and Blog share one fetch.
- Blog cards now open the original Medium article in a new tab instead of loading local Markdown detail pages.
- Error and empty states show a Medium profile fallback link.
- The local `blog/blog-config.js` script is no longer loaded by `index.html`; the existing file is preserved for now but is not the Blog source.
