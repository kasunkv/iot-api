(function(){
	'use strict';

	var recordGetEndpoint = require('./api_modules/recordGetEndpoint');
	var recordAddEndpoint = require('./api_modules/recordAddEndpoint');
	var recordPostEndpoint = require('./api_modules/recordPostEndpoint');

	module.exports = function (app) {
		app.get('/api/get', recordGetEndpoint);
		app.get('/api/add', recordAddEndpoint);
		app.post('/api/post', recordPostEndpoint);

		app.get('*', function (req, res) {
			res.sendFile('index.html', { root: __dirname + '../public/' });
		});	
	};

})();