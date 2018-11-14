var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();
var path = require('path')
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {

    var queryString = req.query.term;
    var term = encodeURIComponent(queryString);
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';

    http.get(url, (response) => {
        response.setEncoding('utf8');

        var body = '';

        response.on('data', (d) => {
            // continuesly update data from giphy
            body += d;
        });

        response.on('end', function() {
            var parsed = JSON.parse(body);
            res.render('home', {gifs: parsed.data});
        });
    });
});
app.listen(port, function() {
    console.log('Gif search on port localhost: 3000!');
});
