document.getElementById('create-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const link = document.getElementById('link').value;

    try {
        const response = await fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body, link }),
        });

        if (response.ok) {
            alert('Article créé avec succès.');
            window.location.href = '/news.html';
        } else {
            const error = await response.json();
            alert(error.message || 'Erreur lors de la création de l\'article.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue.');
    }
});
