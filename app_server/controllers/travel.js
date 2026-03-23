const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

/* GET travel view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };

    console.info('>> travelController.travelList calling ' + requestOptions.url);

    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            _renderTravelList(req, res, body);
        }
    );
};

/* Internal method to render the travel list */
const _renderTravelList = (req, res, responseBody) => {
    let message = null;
    let trips = [];

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        trips = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips found in database';
        } else {
            trips = responseBody;
        }
    }

    res.render('travel', {
        title: 'Travlr Getaways',
        trips: trips,
        message: message
    });
};

module.exports = {
    travelList
};
