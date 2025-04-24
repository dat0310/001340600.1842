const express = require('express');
const router = express.Router();
const vocabController = require('../controllers/vocabController');

router.get('/', vocabController.list_all_words);
router.post('/', vocabController.create_a_word);
router.get('/:wordId', vocabController.read_a_word);
router.put('/:wordId', vocabController.update_a_word);
router.delete('/:wordId', vocabController.delete_a_word);
router.post('/translate', vocabController.translate_word);

module.exports = router;