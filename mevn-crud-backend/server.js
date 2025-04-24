const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./db/dbConnect');
require('dotenv').config();

require('./api/models/vocabModel');

const vocabRoutes = require('./api/routes/vocabRoutes');

app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/words', vocabRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Vocab Builder API' });
});

dbConnect();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});