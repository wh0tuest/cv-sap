# Portfolio Website

My personal portfolio and CV website: [wh0tuest.github.io/cv-sap](https://wh0tuest.github.io/cv-sap/)

Projects and the contact form are powered by my own REST API: [wh0tuest/cv-api](https://github.com/wh0tuest/cv-api) (Java, Spring Boot, PostgreSQL).

## Features

- Projects loaded from the API in three languages (EN / PL / UK)
- Language choice saved in `localStorage`
- Contact form sent to the API, with server-side validation messages
- Responsive dark theme, no frameworks

## Tech stack

HTML, CSS, vanilla JavaScript (`fetch`), GitHub Pages

## Running locally

Open `index.html` with a local server (for example VS Code Live Server). Then the site uses the local API at `http://localhost:8080`; on GitHub Pages it uses the deployed API.