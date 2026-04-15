const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const travel = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    res.render("travel", {
      title: "Travlr Getaways",
      trips: trips,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  travel,
};