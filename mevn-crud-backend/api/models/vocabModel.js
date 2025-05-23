const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabSchema = new Schema({
    english: {
        type: String,
        required: 'English word is required'
    },
    german: {
        type: String,
        required: 'German word is required'
    },
    french: {
        type: String,
        required: 'French word is required'
    }
}, { collection: 'vocab' });

module.exports = mongoose.model('Vocab', VocabSchema);