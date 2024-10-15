const mongoose = require('mongoose');

// Function to connect to MongoDB
async function connectToMongoDB(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

// Correctly export the function
module.exports = connectToMongoDB;
