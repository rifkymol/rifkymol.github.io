# Blog Hybrid Medium + Blog Lokal

## Checklist
- [x] Review current Medium-only renderer and local blog config.
- [x] Restore local blog config loading.
- [x] Normalize local and Medium posts into one combined list.
- [x] Render source badges and mixed local/external card behavior.
- [x] Restore local Markdown detail and share behavior.
- [x] Keep Medium failure non-blocking when local posts exist.
- [x] Run syntax, parser, local detail, Medium, and browser smoke checks.

## Verification
- `node --check` passed for all JavaScript files.
- `git diff --check` passed with no whitespace errors.
- Hybrid parser check passed: 3 local posts from `blog/blog-config.js` plus 1 mocked Medium post sorted into one list.
- Medium failure fallback check passed: local posts still render and the Medium notice appears when the feed fetch fails.
- Headless Edge check passed on `http://127.0.0.1:8788`: Home latest shows 3 mixed posts, Blog shows 4 mixed posts, Medium link opens externally with `noopener noreferrer`, local card opens internal Markdown detail, and direct `/blog/first-blog-post` route renders local detail.

## Review
- Blog now combines local Markdown posts and Medium RSS posts into one date-sorted list.
- Local posts keep the original internal detail page and share behavior.
- Medium posts open on Medium in a new tab and are labeled separately from local posts.
- Source badges distinguish `Personal Blog` and `Medium`.
- Medium feed failure is non-blocking when local posts exist.
