const API_URL = location.hostname === 'wh0tuest.github.io'
    ? 'https://cv-api-x38c.onrender.com'
    : 'http://localhost:8080';

async function loadProjects(lang = 'en') {
    const section = document.getElementById('projects');

    try {
        const response = await fetch(`${API_URL}/api/projects?lang=${lang}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const projects = await response.json();

        section.querySelectorAll('article').forEach(article => article.remove());

        projects.forEach(project => {
            const article = document.createElement('article');

            const title = document.createElement('h3');
            title.textContent = project.title;

            const description = document.createElement('p');
            description.textContent = project.description;

            const technologies = document.createElement('p');
            technologies.textContent = project.technologies.join(' · ');

            article.append(title, description, technologies);
            section.append(article);
        });
    } catch (error) {
        console.error('Could not load projects:', error);
    }
}

const languageButtons = document.querySelectorAll('.lang-switch button');

function setLanguage(lang) {
    localStorage.setItem('lang', lang);          // запам'ятати вибір
    document.documentElement.lang = lang;        // <html lang="pl">

    languageButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.lang === lang);
    });

    loadProjects(lang);
}

languageButtons.forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem('lang') || 'en');

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();   // не перезавантажувати сторінку

    const data = Object.fromEntries(new FormData(contactForm));

    formStatus.textContent = 'Sending...';
    formStatus.className = 'form-status';

    try {
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const body = await response.json();

        if (response.ok) {
            formStatus.textContent = 'Thank you! Your message has been sent.';
            formStatus.classList.add('success');
            contactForm.reset();
        } else if (response.status === 400 && body.fields) {
            formStatus.textContent = Object.values(body.fields).join(' · ');
            formStatus.classList.add('error');
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.error('Could not send message:', error);
        formStatus.textContent = 'Something went wrong. Please email me directly.';
        formStatus.classList.add('error');
    }
});