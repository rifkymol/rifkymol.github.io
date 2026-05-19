# Lessons

- Review this file at the start of future implementation sessions.
- Keep user-modified files safe; inspect git status before editing and avoid unrelated changes.
- Latest direction from Rifky: make Projects the highlight of the website. Books, blog/writing, and photography should still exist as personal context, but the homepage should lead with selected projects.
- Use clean path URLs for every tab route. Do not generate hash tab URLs like `/#reading`; use `/reading`, `/projects`, `/photography`, `/about`, and `/blog`.
- For GitHub-generated portfolio cards, do not treat `repo.language` or topics as the full tech stack. Prefer exact local overrides for known projects, then dependency files, README, GitHub Languages API, and topics only as final hints.
- Do not add README image extraction or lightbox behavior to GitHub project cards unless explicitly re-requested. Keep GitHub project thumbnails simple and focus image expansion work on the Photography feature.
- For downloadable static assets such as a CV, prefer a plain HTML link with `download`, a stable repo path under `assets/`, and existing button classes before adding JavaScript.
