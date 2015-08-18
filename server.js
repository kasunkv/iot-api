(function () {
	'use strict';

	var express = require('express');
	var mongoose = require('mongoose');
	var bodyParser = require('body-parser');
	var appRoutes = require('./api/routes.js');
	var cors = require('cors');

	// Mongoose database connections
	mongoose.connect('mongodb://localhost:27017/tempDB');

	var app = express();
	var port = process.env.PORT || 88;

	// App Config
	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.json());

	// CORS
	app.use(cors());

	// Route config
	appRoutes(app);

	app.listen(port, function () {
	    console.log('API Starting on PORT: ', port);
	});

})();
