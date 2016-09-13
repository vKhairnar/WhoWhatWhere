var express = require('express'),
    Yelp = require('yelp'),
    Dodge = require("dodge"),
    app = express();
app.use(express.static(__dirname + '/src'));

var yelp = new Yelp({
    consumer_key: 'hyIQVkkGLREDsZobyPp5dQ',
    consumer_secret: 'UgKdpO46BHlEOT-3K3MIPilF-Ro',
    token: 'PCPmAjNSEpcZ4T7TFaQ3VKj8-nhhRhWJ',
    token_secret: 'uF-cSlKj9usvzCIjSeVzwR2OcS8'
});

var fourSquare = new Dodge({
    clientId: 'DEMCYUKAIBTKQ0Q2UMG33N2GLIQQU2RUXA2CA1YNSUKMGPY0',
    clientSecret: 'K4ERZWBFEKBWCIVOJMWMZQJPOB3NO5TTX40UO1L02QE3D1TR'
});

function getData(options, callBack) {
    yelp.search({term: options.term, location: options.location})
        .then(function (ydata) {
            console.log('main-data', ydata);
            fourSquare.venues.search({near: options.location, query: options.term}, function (err, venues) {
                if (err) {
                    console.error(err)
                } else {
                    var data = {
                        ydata: ydata.businesses,
                        venues: venues
                    };
                    callBack(null, data);
                }
            });
        })
        .catch(function (error) {
            callBack(error);
        });
}
app.get('/search', function (request, response) {
    var param = request.query;
    getData(param, function (err, data) {
        if (err) {
            response.send({error: true});
        } else {
            response.send(data);
        }
    });
});

app.listen(2020);
console.log('Running......2020');