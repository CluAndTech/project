"use strict";

var fs = require("fs");
require('remedial');
var lobby = {};
var all_lobby = [];

var creer = function (req, res, query) {

	var marqueurs;
	var page;
	var idx;
	var compte = query.compte;
	var contenu_lobby;
	var contenu_all_lobby;
	page = fs.readFileSync('attente_lobby.html', 'UTF-8');

	if(query.action === "creer")
	{
	lobby.membres = [];
	lobby.membres.push(query.compte);
	all_lobby.push(compte + ".json");
	contenu_lobby = JSON.stringify(lobby);
	fs.writeFileSync(compte+".json", contenu_lobby, 'UTF-8');
	contenu_all_lobby = JSON.stringify(all_lobby);
	fs.writeFileSync("lobby.json", contenu_all_lobby, 'UTF-8');

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.hote = query.compte;
	marqueurs.joueurs = "";
	page = page.supplant(marqueurs);
	}
	if(query.action === "attendre")
	{
	contenu_lobby = fs.readFileSync(query.hote+".json", 'UTF-8');
	lobby = JSON.parse(contenu_lobby);
	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.hote = query.hote;
	marqueurs.joueurs = lobby.membres[0];
	for(idx=1; idx<lobby.membres.length; idx++)
	{
		marqueurs.joueurs += "<br/>" + lobby.membres[idx];
	}
	console.log(lobby.membres);
	page = page.supplant(marqueurs);
	}

	if (query.action === "rejoindre")
	{
		contenu_lobby = fs.readFileSync(query.hote+".json", 'UTF-8');
		lobby = {};
		lobby = JSON.parse(contenu_lobby);
		lobby.membres.push(query.compte);
		contenu_lobby = JSON.stringify(lobby);
		fs.writeFileSync(query.hote+".json", contenu_lobby, 'UTF-8');
		marqueurs = {};
		marqueurs.compte = query.compte;
		marqueurs.joueurs = "";
		marqueurs.hote = query.hote;
		page = page.supplant(marqueurs);
		
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = creer;
