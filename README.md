# Seekho Digital — learning website package

This is a static HTML/CSS/JavaScript site intended for GitHub Pages. It needs no build step, paid API, database or sign-in.

## Pages included
- `index.html` — the complete home page and directory of all learning sections
- `modules/module-01.html` through `modules/module-10.html` — ten separate module pages with lesson accordions, practice prompts, notes and completion tracking
- `practice.html` — topic-filtered MCQ practice with explanations
- `interview.html` — beginner interview question bank and answer notes
- `projects.html` — six connected practical project briefs
- `resources.html` — official external learning resources
- `workbook.html` — local progress, reflections and a notes backup export
- `faq.html` — help and FAQs

## Technical notes
- Plain HTML, CSS and JavaScript. No framework or build process.
- Progress and notes use browser local storage on the learner's current device.
- Sample business and data are explicitly fictional / simulated.
- The site does not offer certificates, job placement, guaranteed outcomes or human grading.
- External provider pages control their own availability, fees and certificate terms.

## Test locally
Open `index.html` in a browser. For the full experience, keep the `assets` and `modules` folders beside the root HTML files.

## GitHub Pages upload
Extract the ZIP first. Upload the *contents* of this folder into the repository root on the intended working branch, keeping the `assets/` and `modules/` folder structure. Do not upload only the ZIP file. Before replacing existing files, keep a copy of the repository or use a separate test branch. GitHub Pages should point to the branch and folder that contain this `index.html`.
