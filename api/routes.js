(function(){
	'use strict';

	var cors = require('cors');

	var recordGetEndpoint = require('./modules/recordGetEndpoint');
	var recordAddEndpoint = require('./modules/recordAddEndpoint');
	var recordPostEndpoint = require('./modules/recordPostEndpoint');
	var updateEndpoint = require('./modules/updateEndpoint');
	var slotGetEndpoint = require('./modules/slotGetEndpoint');
	var slotPostEndpoint = require('./modules/slotPostEndpoint');
	var slotAddEndpoint = require('./modules/slotAddEndpoint');

	module.exports = function (app) {
		/* Slots */
		app.get('/api/slot/get', cors(), slotGetEndpoint);
		app.get('/api/slot/add', cors(), slotAddEndpoint);
		app.post('/api/slot/post', cors(), slotPostEndpoint);

		/* Records */
		app.get('/api/record/get', cors(), recordGetEndpoint);
		app.get('/api/record/add', cors(), recordAddEndpoint);
		app.post('/api/record/post', cors(), recordPostEndpoint);
		
		/* Updates */
		app.get('/api/update', updateEndpoint);

		/* Mobile App Endpoints */ 

		app.get('*', function (req, res) {
			res.sendFile('index.html', { root: __dirname + '../public/' });
		});	
	};

})();