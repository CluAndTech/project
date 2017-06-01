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

		marqueurs.FirstD = Number(Math.floor(Math.random()*6)+1);
		marqueurs.SecondD = Number(Math.floor(Math.random()*6)+1);
		marqueurs.total = marqueurs.FirstD + marqueurs.SecondD;
	
		game = fs.readFileSync(query.hote + ".json", "UTF-8");
		game = JSON.parse(game);

		y = game.position[game.actif][0];
		x = game.position[game.actif][1];
		console.log(x);
		console.log(y);
		marqueurs.map = map(marqueurs.total,x,y);
		page = fs.readFileSync("map_fantome.html","utf-8");
	}

	page = page.supplant(marqueurs);
	res.write(page);
	res.end();

};

module.exports = jeu;




