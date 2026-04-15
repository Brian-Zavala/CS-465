const mongoose = require('mongoose');
const Trip = require('./trips');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/travlr').then(() => {
    console.log('Mongoose connected for seeding.');
    seedDatabase();
}).catch(err => {
    console.error('Mongoose connection error:', err);
});

const seedDatabase = async () => {
    try {
        // Read the JSON file
        const dataPath = path.join(__dirname, '../../data/trips.json');
        const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Clear existing trips
        await Trip.deleteMany({});
        console.log('Existing trips cleared.');

        // Insert new trips
        await Trip.insertMany(trips);
        console.log(`${trips.length} trips seeded successfully.`);

    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
        console.log('Mongoose connection closed.');
    }
};
