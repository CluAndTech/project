/*
** afficher_carte.js
** AFFICHAGE DES CARTES
*/

"use strict";

var fs = require("fs");

var afficher_carte = function(host, account)
{
	var cartes;
	var i, marqueurs={};
	var game = fs.readFileSync(host+".json", "UTF-8");
	game = JSON.parse(game);
	if (account === undefined)
		cartes = game.cartes[game.actif];
	else {
		i = 0;

		do {
		cartes = game.cartes[i];
		i++;
		} while(account !== game.vivant[i - 1]);
	}

	marqueurs.cartes = "";
    for(i=0; i < cartes.length; i++){
	    	if(i !==0 && i%2 === 0) {
			marqueurs.cartes += "<p>";
		}
		marqueurs.cartes += "<img src='./cartes/" + cartes[i] + ".jpg'>";
	}	
	return marqueurs.cartes;
}
module.exports = afficher_carte;
