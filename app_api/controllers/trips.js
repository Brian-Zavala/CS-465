const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const authController = require('./authentication');

const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

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

const tripsAddTrip = async (req, res) => {
    authController.getUser(req, res, async (req, res, userName) => {
        try {
            const trip = await Trip.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            });
            return res.status(201).json(trip);
        } catch (err) {
            return res.status(400).json(err);
        }
    });
};

const tripsUpdateTrip = async (req, res) => {
    authController.getUser(req, res, async (req, res, userName) => {
        try {
            const trip = await Trip.findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true }
            ).exec();
            
            if (!trip) {
                return res.status(404).json({ "message": "trip not found" });
            }
            return res.status(200).json(trip);
        } catch (err) {
            return res.status(500).json(err);
        }
    });
};

const tripsDeleteTrip = async (req, res) => {
    authController.getUser(req, res, async (req, res, userName) => {
        try {
            const trip = await Trip.findOneAndDelete({ 'code': req.params.tripCode }).exec();
            if (!trip) {
                return res.status(404).json({ "message": "trip not found" });
            }
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json(err);
        }
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
