/*
 ** File Name : req_lobby.js
 ** Creation Date : 22-05-2017
 ** Last Modified : Mon 22 May 2017 13:59:20 CEST
 ** Created by : Melvin DELPIERRE
 ** NOTE :
 */


"use strict";

var fs = require("fs");
var kick = require("./kick.js");
require('remedial');
var lobby = {};

var creer = function (req, res, query) {

	var marqueurs = {};
	var page;
	var idx;
	var compte = query.compte;
	var hote = query.hote;
	var compteur;
	page = fs.readFileSync('attente_lobby.html', 'UTF-8');

	if(query.action === "creer")
	{
		lobby[compte] = {};
		lobby[compte].joueurs = [];
		lobby[compte].joueurs.push(query.compte);
		lobby[compte].time = [];
		lobby[compte].time.push(Math.floor(Date.now() / 1000));
		lobby[compte].etat = "attente";
		lobby.liste = [];
		lobby.liste.push(compte);
		lobby = JSON.stringify(lobby);
		fs.writeFileSync("lobby.json", lobby, "UTF-8");

		marqueurs = {};
		marqueurs.compte = query.compte;
		marqueurs.hote = query.compte;
		marqueurs.joueurs = "";
		marqueurs.button = "";
		page = page.supplant(marqueurs);
	}
	if(query.action === "attendre")
	{
		kick(query.hote, query.compte);
		lobby = fs.readFileSync("./lobby.json", "UTF-8");
		lobby = JSON.parse(lobby);
		marqueurs.compte = compte;
		marqueurs.hote = hote;
		marqueurs.joueurs = lobby[hote].joueurs[0];

		for (idx = 1; idx < lobby[hote].joueurs.length; idx++)
		{
			marqueurs.joueurs += "<br/>" + lobby[hote].joueurs[idx];
		}

		compteur = lobby[hote].joueurs.length;
		console.log(compteur);
		marqueurs.button = "";

		if(compteur === 3){

			marqueurs.button = "<form action=\"/lobby\" method=\"GET\">"
				+"<input type=\"hidden\" name=\"compte\" value="+query.compte+">"
				+"<input type=\"hidden\" name=\"hote\" value="+query.hote+">"
				+"<button name=\"action\" value=\"lancement\">Lancement "+"</button>"
				+"</form>"

		}
		console.log(lobby[hote].joueurs);
		page = page.supplant(marqueurs);
	}

	if (query.action === "rejoindre")
	{
		kick(hote, compte);
		lobby = fs.readFileSync("lobby.json", "UTF-8");
		lobby = JSON.parse(lobby);
		lobby[hote].joueurs.push(compte);
		lobby[hote].time.push(Math.floor(Date.now() / 1000));
		lobby = JSON.stringify(lobby);
		fs.writeFileSync("lobby.json", lobby, "UTF-8");
		marqueurs = {};
		marqueurs.compte = compte;
		marqueurs.joueurs = "";
		marqueurs.hote = hote;
		page = page.supplant(marqueurs);
	}

	if (query.action === "lancement")
	{
		var i;

		lobby = fs.readFileSync("lobby.json", "UTF-8");
		lobby = JSON.parse(lobby);
		lobby[hote].etat="en_cours";
		marqueurs = {};
		marqueurs.compte = compte;
		marqueurs.hote = hote;

		for (i = 0; i < lobby[hote].joueurs.length; i++)
		{
			if (hote === lobby[hote].joueurs[i] &&
				compte === lobby[hote].joueurs[i])
			{
				page = fs.readFileSync("plateau_actif.html", "UTF-8");
				break;
			}else if (hote === lobby[hote].joueurs[i] &&
					  compte !== lobby[hote].joueurs[i])
			{
				page = fs.readFileSync("plateau_passif.html", "UTF-8");
			}
		}
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

module.exports = creer;
