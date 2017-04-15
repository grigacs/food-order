/**
 * Created by griga on 2017-04-14.
 */
var express = require("express");
var myParser = require("body-parser");
var app = express();
var fs = require("fs");
var path = require('path');


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use(myParser.json());

app.post('/', function (request, response) {
    fs.readFile('database.json', function (err, data) {
        var json = JSON.parse(data);
        var users = json.database.users;
        users.push(request.body);
        fs.writeFile("database.json", JSON.stringify(json));
    });
    //console.log(request.body);

    response.end('registered');
});

app.get( '/database', function ( request, response ) {
    response.end( require('fs').readFileSync('./database.json', 'utf8'));
});


app.listen(8100);