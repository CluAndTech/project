/*
 **File name : req_jeu.js
 ** Creation Date : 22-05-2017
 ** Last Modified : Wed 14 Jun 2017 14:19:20 CEST
 ** Created by : Melvin DELPIERRE
 ** NOTE :
 */

"use strict";

var fs = require("fs");
require('remedial');
var map = require("./map_deplacement.js");
var map_afficher = require("./map_afficher.js");
var verif_salle = require("./verif_salle.js");
var afficher_carte = require("./afficher_carte.js");
var next_turn = require("./next_turn.js");
var map_wait = require("./map_wait.js");


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
	marqueurs.cartes = afficher_carte(query.hote);

	var game = JSON.parse(fs.readFileSync(query.hote + ".json", "UTF-8"));

	if (query.compte === game.vivant[game.actif]){
		page = fs.readFileSync("plateau_actif.html", "utf-8");
	}else {
		page = fs.readFileSync("plateau_passif.html", "utf-8");

		marqueurs = map_wait(query.hote, marqueurs);
		marqueurs.cards = afficher_carte(query.hote, query.compte);
		console.log("z");
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
	else if (query.action === "deplacement"){
		var compte = query.compte;
		var hote = query.hote;
		var x = query.x;
		var y = query.y;
		var game = fs.readFileSync(hote+".json","UTF-8");
		var position;

		console.log("marqueurs = " + marqueurs);

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
			next_turn(hote);
		}	
	} 
	else if(query.action === "accuser"){

		var game = fs.readFileSync(query.hote+".json",game,"UTF-8");
		var c;
		var w;
		var p;

		game = JSON.parse(game);
		c = game.scenario[0];
		p = game.scenario[1];
		w = game.scenario[2];
		marqueurs.c = c;
		marqueurs.p = p;
		marqueurs.w = w;
		if(query.characters === c && query.weapon === w && query.place === p){
			page = fs.readFileSync("victoire.html","UTF-8");
		} else {
			page = fs.readFileSync("defaite.html","UTF-8");
		}

	}
	else if(query.action === "soupconner"){

		var game = fs.readFileSync(query.hote+".json",game,"UTF-8");
		var i;
		var x = [];
		var a;
		var result;
		var min;
		var max;
		var verif;

		game = JSON.parse(game);
		verif = game.cartes[(game.actif + 1)%3];
		a = 0;

		for(i=0; i<verif.length-1; i++){

			if(query.characters === verif[i]){	
				x[a] = verif[i];	
				a++;
			}else if(query.weapon === verif[i]){
				x[a] = verif[i];
				a++;
			}else if(query.place === verif[i]){
				x[a] = verif[i];
				a++;
			}
		}

		if(x.length === 0){

			verif = game.cartes[(game.actif + 2)%3];
			a = 0;

			for(i=0; i<verif.length-1; i++){

				if(query.characters === verif[i]){
					x[a] = verif[i];
					a++;
				}else if(query.weapon === verif[i]){
					x[a] = verif[i];
					a++;
				}else if(query.place === verif[i]){
					x[a] = verif[i];
					a++;
				}
			}

		}
		for(i=0; i<x.length;i++){
			console.log(x[i])
			}

		if(x.length === 0){
			marqueurs.result = "Aucune carte que vous soupçonner n'est dans les mains des joueurs";
		}else{

		max = x.length -1;
		min = 0;
		a = Math.floor(Math.random()*(max - min)) + min;
		marqueurs.result = "La cartes est" + x[a];
		}
		page = fs.readFileSync("map_resultat_soupcon.html","utf-8");

				}

				page = page.supplant(marqueurs);
				res.write(page);
				res.end();

				};

				module.exports = jeu;


