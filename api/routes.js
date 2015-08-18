(function(){
	'use strict';

	var recordGetEndpoint = require('./modules/recordGetEndpoint');
	var recordAddEndpoint = require('./modules/recordAddEndpoint');
	var recordPostEndpoint = require('./modules/recordPostEndpoint');

	module.exports = function (app) {
		app.get('/api/get', recordGetEndpoint);
		app.get('/api/add', recordAddEndpoint);
		app.post('/api/post', recordPostEndpoint);

		app.get('*', function (req, res) {
			res.sendFile('index.html', { root: __dirname + '../public/' });
		});	
	};

})();