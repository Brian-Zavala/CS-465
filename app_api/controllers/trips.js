const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /trips - list all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        
        if (!trips || trips.length === 0) {
            return res.status(404).json({ "message": "trips not found" });
        }
        
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// GET: /trips/:tripCode - find a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.find({ 'code': req.params.tripCode }).exec();
        
        if (!trip || trip.length === 0) {
            return res.status(404).json({ "message": "trip not found" });
        }
        
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
