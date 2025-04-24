const mongoose = require('mongoose'),
    Vocab = mongoose.model('Vocab');

exports.list_all_words = async function(req, res) {
    try {
        const words = await Vocab.find({});
        res.json(words);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.create_a_word = async function(req, res) {
    try {
        const newWord = new Vocab(req.body);
        const word = await newWord.save();
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.read_a_word = async function(req, res) {
    try {
        const word = await Vocab.findById(req.params.wordId);
        if (!word) {
            return res.status(404).json({ message: 'Word not found' });
        }
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.update_a_word = async function(req, res) {
    try {
        const word = await Vocab.findOneAndUpdate(
            { _id: req.params.wordId },
            req.body,
            { new: true }
        );
        if (!word) {
            return res.status(404).json({ message: 'Word not found' });
        }
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.delete_a_word = async function(req, res) {
    try {
        const result = await Vocab.deleteOne({ _id: req.params.wordId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Word not found' });
        }
        res.json({ message: 'Word successfully deleted', _id: req.params.wordId });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.translate_word = async function(req, res) {
    const { text, sourceLang, targetLang } = req.body;
    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Map language codes to database fields
        const langMap = {
            en: 'english',
            de: 'german',
            fr: 'french'
        };

        const sourceField = langMap[sourceLang];
        const targetField = langMap[targetLang];

        if (!sourceField || !targetField) {
            return res.status(400).json({ message: 'Invalid language code' });
        }

        // Find the word in the database
        const query = { [sourceField]: text };
        const word = await Vocab.findOne(query);

        if (!word) {
            return res.status(404).json({ message: `Word "${text}" not found in ${sourceLang} vocabulary` });
        }

        // Return the translated word
        const translatedText = word[targetField];
        res.json({ translatedText });
    } catch (err) {
        res.status(500).json({ message: 'Error translating word', error: err.message });
    }
};