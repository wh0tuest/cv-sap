const API_URL = location.hostname === 'wh0tuest.github.io'
    ? 'https://cv-api-x38c.onrender.com'
    : 'http://localhost:8080';

let translations = {};

async function applyTranslations(lang) {
    const response = await fetch(`i18n/${lang}.json`);
    if (!response.ok) {
        console.error(`Cannot load i18n/${lang}.json`);
        return;
    }
    translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const text = translations[el.dataset.i18n];
        if (text) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const text = translations[el.dataset.i18nPlaceholder];
        if (text) el.placeholder = text;
    });

    document.documentElement.lang = lang;
}

function t(key) {
    return translations[key] ?? key;
}
    
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
    localStorage.setItem('lang', lang);

    languageButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.lang === lang);
    });

    applyTranslations(lang);
    loadProjects(lang);
}

languageButtons.forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

setLanguage(localStorage.getItem('lang') || 'en');

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm));

    formStatus.textContent = t('form.sending');            
    formStatus.className = 'form-status';

    try {
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const body = await response.json();

        if (response.ok) {
            formStatus.textContent = t('form.success'); 
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
        formStatus.textContent = t('form.error');  
        formStatus.classList.add('error');
    }
});