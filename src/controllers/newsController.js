const axios = require('axios');
const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {
    async getAllNews(req, res) {
        try {
            const response = await axios.get(DUMMY_JSON_URL);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur.' });
        }
    },

    async getNewsById(req, res) {
        const { id } = req.params;
        try {
            const response = await axios.get(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(404).json({ message: 'Article non trouvé.' });
        }
    },

    async createNews(req, res) {
        const { title, body, link } = req.body;
        try {
            const response = await axios.post(DUMMY_JSON_URL, { title, body, link });
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur.' });
        }
    },

    async updateNews(req, res) {
        const { id } = req.params;
        const { title, body, link } = req.body;
        try {
            const response = await axios.put(`${DUMMY_JSON_URL}/${id}`, { title, body, link });
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur.' });
        }
    },

    async deleteNews(req, res) {
        const { id } = req.params;
        try {
            await axios.delete(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json({ message: 'Article supprimé.' });
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur.' });
        }
    }
};

module.exports = newsController;
