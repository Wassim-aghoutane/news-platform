// Fonction pour récupérer et afficher les détails d'un article
async function fetchArticleDetails() {
    const params = new URLSearchParams(window.location.search); // Récupère les paramètres de l'URL
    const id = params.get('id'); // Récupère l'ID de l'article à partir des paramètres

    try {
        const response = await fetch(`/api/news/${id}`); // Appelle l'API pour obtenir les détails de l'article
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'article.');
        }
        const article = await response.json(); // Convertit la réponse en JSON

        // Affiche les détails de l'article
        document.getElementById('article-details').innerHTML = `
            <h1>${article.title}</h1>
            <p>${article.body}</p>
            ${article.link ? `<p><strong>Lien associé :</strong> <a href="${article.link}" target="_blank">${article.link}</a></p>` : ''}
        `;
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('article-details').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Impossible de charger les détails de l'article.
            </div>
        `;
    }
}

// Appelle la fonction lorsque la page est chargée
document.addEventListener('DOMContentLoaded', fetchArticleDetails);
