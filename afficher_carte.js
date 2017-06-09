//KOMENTERE
//
"use strict";

var fs = require("fs");

var afficher_carte = function(query)
{
	var game = fs.readFileSync(query.hote+".json", "UTF-8");
	game = JSON.parse(game);
	var cartes = game.cartes[game.actif];
	var i, marqueurs={};
	marqueurs.cartes = "";
    for(i=0; i < cartes.length; i++){
		marqueurs.cartes += "<img src='./cartes/" + cartes[i] + ".jpg'>";
	}	
	console.log(marqueurs.cartes);
	return marqueurs.cartes;
}
module.exports = afficher_carte;
