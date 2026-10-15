const API_URL = 'http://localhost:8080';

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

loadProjects();