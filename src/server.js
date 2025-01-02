require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/news', newsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Une erreur interne est survenue.' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée.' });
});

app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
