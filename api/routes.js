(function(){
	'use strict';

	var recordGetEndpoint = require('./modules/recordGetEndpoint');
	var recordAddEndpoint = require('./modules/recordAddEndpoint');
	var recordPostEndpoint = require('./modules/recordPostEndpoint');
	var updateEndpoint = require('./modules/updateEndpoint');
	var slotGetEndpoint = require('./modules/slotGetEndpoint');
	var slotPostEndpoint = require('./modules/slotPostEndpoint');
	var slotAddEndpoint = require('./modules/slotAddEndpoint');

	module.exports = function (app) {
		/* Slots */
		app.get('/api/slot/get', slotGetEndpoint);
		app.get('/api/slot/add', slotAddEndpoint);
		app.post('/api/slot/post', slotPostEndpoint);

		/* Records */
		app.get('/api/record/get', recordGetEndpoint);
		app.get('/api/record/add', recordAddEndpoint);
		app.post('/api/record/post', recordPostEndpoint);
		
		/* Updates */
		app.get('/api/update', updateEndpoint);

		/* Mobile App Endpoints */ 

		app.get('*', function (req, res) {
			res.sendFile('index.html', { root: __dirname + '../public/' });
		});	
	};

})();