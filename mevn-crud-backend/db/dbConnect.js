const mongoose = require('mongoose');

async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: 'vocab-builder',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to MongoDB!');
    } catch (error) {
        console.error('Unable to connect to MongoDB!', error);
    }
}

module.exports = dbConnect;