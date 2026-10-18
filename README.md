# Portfolio Website — Oleksandr Martyniuk

Personal portfolio and CV website of a Junior Java Developer. A single page application built with plain HTML, CSS and JavaScript, connected to my own Spring Boot REST API.

🔗 **Live:** https://wh0tuest.github.io/cv-sap/
⚙️ **Backend:** [cv-api](https://github.com/wh0tuest/cv-api)

## Features

- **Multilingual UI (EN / PL / UA):** page texts are loaded from JSON translation files, and the selected language is saved in `localStorage`
- **Dynamic projects section:** project cards are fetched from the REST API (`GET /api/projects?lang=...`) and translated on the backend
- **Contact form:** sends messages to the API (`POST /api/contact`) with server-side validation and error messages
- **Responsive design:** works on desktop and mobile
- **Developer-style dark theme** with the JetBrains Mono font

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS3 (Flexbox, Grid, variables, media queries), Vanilla JavaScript (fetch, async/await, DOM) |
| Backend | Java 21, Spring Boot, Spring Data JPA, PostgreSQL, Flyway |
| Hosting | GitHub Pages (frontend), Render (API), Neon (PostgreSQL) |

## Architecture

```
Browser (GitHub Pages)
  │
  ├── i18n/*.json            → static page translations
  │
  └── fetch → cv-api (Render, Spring Boot in Docker)
                 │
                 └── PostgreSQL (Neon)
```

## How translations work

1. Every text element has a key: `<h2 data-i18n="about.title">About Me</h2>`
2. Translations are stored in `i18n/en.json`, `i18n/pl.json` and `i18n/uk.json`
3. When the language changes, `app.js` loads the matching JSON file and replaces the text of all `[data-i18n]` elements
4. Project cards are requested from the API with `?lang=`, so they are translated by the backend

## Project Structure

```
├── index.html          # page markup
├── css/
│   └── style.css       # styles
├── js/
│   └── app.js          # translations, API calls, contact form
├── i18n/
│   ├── en.json
│   ├── pl.json
│   └── uk.json
└── cv.pdf
```

## Run Locally

1. Start the backend ([cv-api](https://github.com/wh0tuest/cv-api)) on `http://localhost:8080`
2. Open this folder in VS Code and run **Live Server** (`http://127.0.0.1:5500`)

> The page must be served over HTTP (Live Server), not opened as `file://`. Otherwise the browser blocks loading of the JSON files.

`app.js` picks the API address automatically: `localhost:8080` locally, and the Render URL on GitHub Pages.

## Contact

- Email: sashavmart@gmail.com
- LinkedIn: [linkedin.com/in/sanyavmart](https://www.linkedin.com/in/sanyavmart)
- GitHub: [wh0tuest](https://github.com/wh0tuest)