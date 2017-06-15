/*
** afficher_carte.js
** AFFICHAGE DES CARTES
*/

"use strict";

var fs = require("fs");

var afficher_carte = function(host, account)
{
console.log("a");
	var cartes;
	var i, marqueurs={};
	var game = fs.readFileSync(host+".json", "UTF-8");
	game = JSON.parse(game);
console.log("b");
	if (account === undefined)
		cartes = game.cartes[game.actif];
	else {
		i = 0;

console.log("account : " + account);

		do {
		cartes = game.cartes[i];
		i++;
//		console.log("game.cartes[i] : " + game.cartes[i] + " | i : " + i);
		} while(account !== game.vivant[i - 1]);
	}
console.log("c");

	marqueurs.cartes = "";
    for(i=0; i < cartes.length; i++){
		marqueurs.cartes += "<img src='./cartes/" + cartes[i] + ".jpg'>";
	}	
console.log("d");
	console.log(marqueurs.cartes);
	return marqueurs.cartes;
}
module.exports = afficher_carte;
