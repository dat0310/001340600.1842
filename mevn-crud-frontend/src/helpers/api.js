import axios from 'axios';

const baseURL = '/api/words/';

export const api = {
    async getWord(id) {
        try {
            const res = await axios.get(baseURL + id);
            return res.data;
        } catch (error) {
            console.error('Error fetching word:', error);
            throw error;
        }
    },
    async getWords() {
        try {
            const res = await axios.get(baseURL);
            return res.data;
        } catch (error) {
            console.error('Error fetching words:', error);
            throw error;
        }
    },
    async createWord(payload) {
        try {
            const res = await axios.post(baseURL, payload);
            return res.data;
        } catch (error) {
            console.error('Error creating word:', error);
            throw error;
        }
    },
    async updateWord(payload) {
        try {
            const res = await axios.put(baseURL + payload._id, payload);
            return res.data;
        } catch (error) {
            console.error('Error updating word:', error);
            throw error;
        }
    },
    async deleteWord(id) {
        try {
            const res = await axios.delete(baseURL + id);
            return res.data;
        } catch (error) {
            console.error('Error deleting word:', error);
            throw error;
        }
    },
    async translateWord(text, sourceLang, targetLang) {
        try {
            const res = await axios.post(baseURL + 'translate', { text, sourceLang, targetLang });
            return res.data.translatedText;
        } catch (error) {
            console.error('Error translating word:', error);
            throw error;
        }
    }
};