(function(){
	'use strict';

	var recordGetEndpoint = require('./modules/recordGetEndpoint');
	var recordAddEndpoint = require('./modules/recordAddEndpoint');
	var recordPostEndpoint = require('./modules/recordPostEndpoint');
	var updateSlotEndpoint = require('./modules/updateSlotEndpoint');
	var slotGetEndpoint = require('./modules/slotGetEndpoint');

	module.exports = function (app) {
		app.get('/api/get', recordGetEndpoint);
		app.get('/api/add', recordAddEndpoint);
		app.get('/api/update-slot', updateSlotEndpoint);
		app.post('/api/post', recordPostEndpoint);
		app.get('/api/slots', slotGetEndpoint);

		app.get('*', function (req, res) {
			res.sendFile('index.html', { root: __dirname + '../public/' });
		});	
	};

})();