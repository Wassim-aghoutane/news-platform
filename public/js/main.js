async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        displayNews(data.posts);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de charger les articles.');
    }
}

function displayNews(news) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    news.forEach(article => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.body.substring(0, 100)}...</p>
                        <a href="/news-details.html?id=${article.id}" class="btn btn-primary">Voir plus</a>
                        <button class="btn btn-danger mt-2" onclick="deleteArticle(${article.id})">Supprimer</button>
                        <button class="btn btn-warning mt-2" onclick="editArticle(${article.id})">Modifier</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

async function deleteArticle(id) {
    try {
        await fetch(`/api/news/${id}`, { method: 'DELETE' });
        alert('Article supprimé.');
        fetchLatestNews();
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de supprimer l\'article.');
    }
}

async function editArticle(id) {
    const newTitle = prompt('Entrez le nouveau titre:');
    const newBody = prompt('Entrez le nouveau contenu:');
    const newLink = prompt('Entrez le nouveau lien (optionnel):');

    if (!newTitle || !newBody) {
        alert('Titre et contenu sont obligatoires.');
        return;
    }

    try {
        await fetch(`/api/news/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, body: newBody, link: newLink }),
        });
        alert('Article modifié.');
        fetchLatestNews();
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de modifier l\'article.');
    }
}

document.addEventListener('DOMContentLoaded', fetchLatestNews);
