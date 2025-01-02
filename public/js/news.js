async function fetchAllNews() {
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
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', fetchAllNews);
