var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();
var path = require('path')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/', express.static('public/'));  

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
  res.render('hello-gif', {gifUrl: gifUrl});
});

app.get('/', function(req, res){
    giphy.search(req.query.term, function(err, response){
        res.render('home', {gifs: response.data})
    });
});

app.listen(3000, function() {
    console.log('Gif search on port localhost: 3000!');
});




// http.get(url, function(response){
//     response.setEncoding('utf8');
//     var body = '';
//     response.on('data', function(d){
//         // continuesly update data from giphy
//         body += d;
//     });
//     response.on('end', function(){
//         var parsed = JSON.parse(body);
//         res.render('home', {gifs: parsed.data});
//     });
// });
