"use strict";

var fs = require("fs");
require('remedial');
var lobby = {};

var creer = function (req, res, query) {

	var marqueurs;
	var page;
	var idx;
	var compte = query.compte;
	var contenu_lobby;
	page = fs.readFileSync('attente_lobby.html', 'UTF-8');

	if(query.action === "creer")
	{
	lobby.membres = [];
	lobby.membres.push(query.compte);
	contenu_lobby = JSON.stringify(lobby);
	fs.writeFileSync("lobby.json", contenu_lobby, 'UTF-8');

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.joueurs = "";
	page = page.supplant(marqueurs);
	}
	if(query.action === "attendre")
	{
	contenu_lobby = fs.readFileSync("lobby.json", 'UTF-8');
	lobby = JSON.parse(contenu_lobby);
	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.joueurs = lobby.membres[0];
	for(idx=1; idx<lobby.membres.length; idx++)
	{
		marqueurs.joueurs += "<br/>" + lobby.membres[idx];
	}
	console.log(lobby.membres);
	page = page.supplant(marqueurs);
	}

	

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = creer;
