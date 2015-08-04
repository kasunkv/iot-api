var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var tempGetEndpoint = require('./api_modules/tempGetEndpoint');
var tempAddEndpoint = require('./api_modules/tempAddEndpoint');
var tempPostEndpoint = require('./api_modules/tempPostEndpoint');

// Database connections and model imports
var Temperature = require('./models/tempModel.js');
// Mongoose database connections
mongoose.connect('mongodb://localhost:27017/tempDB');

var app = express();
app.use(bodyParser.json());
// CORS
app.use(cors());

app.get('/api/get', tempGetEndpoint);
app.get('/api/add', tempAddEndpoint);
app.post('/api/post', tempPostEndpoint);

var server = app.listen(3000, function () {
    console.log('API Starting on PORT: ', server.address().port);
});
