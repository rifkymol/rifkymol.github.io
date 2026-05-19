# Homepage Download CV Button

## Checklist
- [x] Inspect homepage hero markup and existing action button CSS.
- [x] Check git status and preserve unrelated user changes.
- [x] Copy `Rifky_Maulana_CV.pdf` into `assets/cv/`.
- [x] Add a static Download CV link to the hero action area.
- [x] Verify file path, markup, syntax, download target, and responsive styling.

## Verification
- `assets/cv/Rifky_Maulana_CV.pdf` exists and is 85,041 bytes.
- Hero markup contains the `Download CV` link after `Read the Blog` with `href`, `download`, and the requested accessible label.
- Local static server returned the PDF at `/assets/cv/Rifky_Maulana_CV.pdf` with HTTP 200.
- Existing responsive CSS already applies full-width mobile behavior to `.hero-actions .secondary-action`.
- `node --check` passed for all JavaScript files.
- `git diff --check` passed with no whitespace errors; Git only reported existing CRLF conversion warnings.

## Notes
- Use the existing `.secondary-action` styling.
- Keep the button as a static HTML download link with no JavaScript.
