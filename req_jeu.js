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
	var historique ={};
	var compte = query.compte;

	marqueurs.FirstD = "";
	marqueurs.SecondD = "";
	marqueurs.total = "";
	marqueurs.compte = query.compte;
	marqueurs.hote = query.hote;
	marqueurs.cartes = afficher_carte(query.hote);

	var game = JSON.parse(fs.readFileSync(query.hote + ".json", "UTF-8"));

	if (query.compte === game.vivant[game.actif]){
		page = fs.readFileSync("plateau_actif.html", "utf-8");
		marqueurs.map = map_afficher(query.hote);
		if(game.historique[compte][0] !== undefined)
		{
			marqueurs.historique = "<p>"+game.historique[compte][0]+"</p>";
		}
		for(idx = 1; idx<game.historique[compte].length;idx++){
			marqueurs.historique += "<p>"+game.historique[compte][idx]+"</p>";
		}

	}else {
		game = fs.readFileSync(query.hote + ".json","utf-8");
		page = fs.readFileSync("plateau_passif.html", "utf-8");
		game = JSON.parse(game);
		marqueurs.map = map_afficher(query.hote);
		marqueurs.cards = afficher_carte(query.hote, query.compte);
		if(game.historique[compte][0] !== undefined)
		{
			marqueurs.historique = "<p>"+game.historique[compte][0]+"</p>";
		}
		for(idx = 1; idx<game.historique[compte].length;idx++){
			marqueurs.historique += "<p>"+game.historique[compte][idx]+"</p>";
		}
	}

	if (query.action === "deplacer"){
		var game;
		var x;
		var y;
		var z;

		marqueurs.FirstD = Number(Math.floor(Math.random()*6)+1);
		marqueurs.SecondD = Number(Math.floor(Math.random()*6)+1);
		z = marqueurs.FirstD + marqueurs.SecondD;
		marqueurs.total ="<p>Vous pouvez vous deplacez de " + z+"</p>";

		game = fs.readFileSync(query.hote+".json","utf-8");
		game = JSON.parse(game);
		console.log(game.historique[query.compte]);
		for(idx=0; idx<3; idx++)
		{
			game.historique[game.vivant[idx]][game.historique[game.vivant[idx]].length] = query.compte + " se deplace de " + z;
		}
		console.log(game.historique[query.compte]);
		y = game.position[game.actif][0];
		x = game.position[game.actif][1];
		marqueurs.map = map(z,x,y,query);
		game = JSON.stringify(game);
		game = fs.writeFileSync(query.hote+".json",game,"utf-8");
		page = fs.readFileSync("map_deplacer.html","utf-8");
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
		game.position[game.actif][0] = Number(x);
		game.position[game.actif][1] = Number(y);
		game = JSON.stringify(game);
		fs.writeFileSync(hote+".json", game, "UTF-8");
		position = verif_salle(y,x);
		marqueurs.map = map_afficher(query.hote);
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
		var actif;
		var fin;

		game = JSON.parse(game);
		c = game.scenario[0];
		p = game.scenario[1];
		w = game.scenario[2];
		marqueurs.c = c;
		marqueurs.p = p;
		marqueurs.w = w;

		for(idx=0; idx<3; idx++)
		{
			game.historique[game.vivant[idx]][game.historique[game.vivant[idx]].length] = query.compte + " accuse " + c + " avec " + w + " dans " + p;
		}

		if(query.characters === c && query.weapon === w && query.place === p){
			game.gagnant = query.compte;
			if(query.compte === game.gagnant){
				page = fs.readFileSync("victoire.html","UTF-8");
					actif = game.vivant[(game.actif + 1)%3];
					game.perdant.push(actif);
					actif = game.vivant[(game.actif + 2)%3];
					game.perdant.push(actif);
					game = JSON.stringify(game);
					game = fs.writeFileSync(query.hote+".json",game,"utf-8");
					next_turn(query.hote);
			}
		}else {
			page = fs.readFileSync("defaite.html","UTF-8");
			game.mort = query.compte;
			game = JSON.stringify(game);
			game = fs.writeFileSync(query.hote+".json",game,"UTF-8");
			next_turn(query.hote);
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

		for(idx=0; idx<3; idx++)
		{
			game.historique[game.vivant[idx]][game.historique[game.vivant[idx]].length] = query.compte + " soupconne " + query.characters + " avec " + query.weapon + " dans " + query.place;
		}

		game = JSON.stringify(game);
		fs.writeFileSync(query.hote+".json",game,"UTF-8");
		game = JSON.parse(game);

		for(i=0; i<verif.length; i++){

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

			for(i=0; i<verif.length; i++){

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
			next_turn(query.hote);
		}else{

			max = x.length;
			min = 0;
			a = Math.floor(Math.random()*(max - min)) + min;
			marqueurs.result = "La cartes est" + x[a];
			next_turn(query.hote);
		}
		page = fs.readFileSync("map_resultat_soupcon.html","utf-8");
	}
	for(idx = 0; idx<2;idx++){
	game = fs.readFileSync(query.hote+".json","utf-8")
	game = JSON.parse(game);
	if(query.compte === game.perdant[idx]){
		c = game.scenario[0];
		p = game.scenario[1];
		w = game.scenario[2];
		marqueurs.c = c;
		marqueurs.p = p;
		marqueurs.w = w;	
	page = fs.readFileSync("eliminer.html","utf-8");
	next_turn(query.hote);
	}
	}

	page = page.supplant(marqueurs);
	res.write(page);
	res.end();

};

module.exports = jeu;


