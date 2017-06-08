/*
 **File name : req_jeu.js
 ** Creation Date : 22-05-2017
 ** Last Modified : Thu 01 Jun 2017 10:00:09 CEST
 ** Created by : Melvin DELPIERRE
 ** NOTE :
 */

"use strict";

var fs = require("fs");
require('remedial');
var map = require("./map_deplacement.js");
var map_afficher = require("./map_afficher.js");
var verif_salle = require("./verif_salle.js");
var jeu = function(req,res,query){


	var marqueurs = {};
	var page;
	var idx;
	var FirstD;
	var SecondD;
	marqueurs.FirstD = "";
	marqueurs.SecondD = "";
	marqueurs.total = "";
	marqueurs.compte = query.compte;
	marqueurs.hote = query.hote;

	if(query.action === "actif"){

		page = fs.readFileSync("plateau_actif.html", "utf-8");

	}

	if(query.action === "passif"){

		page = fs.readFileSync("plateau_passif.html", "utf-8");

	}

	if (query.action === "deplacer"){
		var game;
		var x;
		var y;
		var z;

		marqueurs.FirstD = Number(Math.floor(Math.random()*6)+1);
		marqueurs.SecondD = Number(Math.floor(Math.random()*6)+1);
		z = marqueurs.FirstD + marqueurs.SecondD;
		marqueurs.total ="Vous pouvez vous deplacez de " + z;

		game = fs.readFileSync(query.hote + ".json", "UTF-8");
		game = JSON.parse(game);

		y = game.position[game.actif][0];
		x = game.position[game.actif][1];
		console.log(x);
		console.log(y);
		marqueurs.map = map(z,x,y,query);
		page = fs.readFileSync("map_fantome.html","utf-8");
	}
	if (query.action === "deplacement"){
		var compte = query.compte;
		var hote = query.hote;
		var x = query.x;
		var y = query.y;
		var game = fs.readFileSync(hote+".json","UTF-8");
		var position;

		game = JSON.parse(game);
		game.position[game.actif][0] = y;
		game.position[game.actif][1] = x;
		game = JSON.stringify(game);
		fs.writeFileSync(hote+".json", game, "UTF-8");
		position = verif_salle(y,x);
		marqueurs.map = map_afficher(query);
		console.log(position);
		if(position === "salle"){
			page = fs.readFileSync("map_soupcon.html","UTF-8");
		} else if(position === "salle_accusation"){
			page = fs.readFileSync("map_accusation.html","UTF-8");
		} else if(position === "couloir"){
			page = fs.readFileSync("map_fantome.html","UTF-8");
		}	
	};


	page = page.supplant(marqueurs);
	res.write(page);
	res.end();

};

module.exports = jeu;




