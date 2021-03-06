const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ace7497ac9e8602309af76a56045a170/' + latitude +',' + longitude + '?units=si&lang=de'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to service.')
            return;
        }

        if (body.error) {
            callback('Unable to find location.')
            return;
        }

        const temperature = body.currently.temperature;
        const precipProbability = body.currently.precipProbability;

        callback(undefined, {
            summary: body.daily.data[0].summary,
            message: `Es hat zur Zeit ${temperature} Grad. Die Regenwahrscheinlichkeit liegt bei ${precipProbability}%.`
        })
    })
}

module.exports = {
    forecast
}