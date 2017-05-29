"use strict";

var fs = require("fs");
require('remedial');

var map = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('map_fantome.html', 'utf-8');

	marqueurs = {};
	marqueurs.map


	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = map;
