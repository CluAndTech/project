/*
 **File name : req_jeu.js
 ** Creation Date : 22-05-2017
 ** Last Modified : Thu 01 Jun 2017 10:00:09 CEST
 ** Created by : Melvin DELPIERRE
 ** NOTE :
 */

"use strict";

var fs = require("fs");
var deplacer = require("./req_deplacer.js");
require('remedial');

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

	if(query.action === "lancerD"){

		marqueurs.FirstD = Number(Math.floor(Math.random()*6)+1);
		marqueurs.SecondD = Number(Math.floor(Math.random()*6)+1);
		marqueurs.total = marqueurs.FirstD + marqueurs.SecondD;
		page = fs.readFileSync("plateau_deplacement.html","utf-8");
	}

	if (query.action === "deplacer"){
		var game;

		game = fs.readFileSync(query.hote + ".json", "UTF-8");
		game = JSON.parse(game);
		
		game.position[game.actif][0] = query.x;
		game.position[game.actif][1] = query.y;

		game = JSON.stringify(game);
		fs.writeFileSync(query.hote + ".json", game, "UTF-8");
	}

	page = page.supplant(marqueurs);
	res.write(page);
	res.end();

};

module.exports = jeu;




