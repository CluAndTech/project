"use strict";
var fs = require("fs");
var cartes = {};
var cartes_copie;
cartes.personnages = [];
cartes.personnages[0] = "dorignac";
cartes.personnages[1] = "thire";
cartes.personnages[2] = "sanchez";
cartes.personnages[3] = "danesi";
cartes.personnages[4] = "lallite";
cartes.personnages[5] = "fripiat";
cartes.lieux = [];
cartes.lieux[0] = "open_space";
cartes.lieux[1] = "administration";
cartes.lieux[2] = "salle_cours";
cartes.lieux[3] = "buvette";
cartes.lieux[4] = "salle_info";
cartes.lieux[5] = "salle_serveur";
cartes.lieux[6] = "exterieur";
cartes.lieux[7] = "toilettes";
cartes.lieux[8] = "bureaux_profs";
cartes.armes = [];
cartes.armes[0] = "dictionnaire";
cartes.armes[1] = "ordinateur";
cartes.armes[2] = "chaise";
cartes.armes[3] = "RJ45";
cartes.armes[4] = "extincteur";
cartes.armes[5] = "3310";
cartes_copie = cartes;

var generer_scenario = function(cartes_copie){

	var scenario = [];
	var random;

	random = Math.floor(Math.random() * 6);
	scenario[0] = cartes_copie.personnages[random];
	cartes_copie.personnages.splice(random,1);

	random = Math.floor(Math.random() * 9);
	scenario[1] = cartes_copie.lieux[random];
	cartes_copie.lieux.splice(random,1);

	random = Math.floor(Math.random() * 6);
	scenario[2] = cartes_copie.armes[random];
	cartes_copie.armes.splice(random,1);

	return scenario;
};

var melanger_cartes = function(cartes)
{
	var idx;
	var r1,r2,tempo;
	for(idx = 0; idx < 20; idx++);
	{
		r1 = Math.floor(Math.random() * cartes.length);
		r2 = Math.floor(Math.random() * cartes.length);
		tempo = cartes[r1];
		cartes[r1] = cartes[r2];
		cartes[r2] = tempo;
	}
	return cartes;
};

var distribuer_carte = function(cartes)
{
	var arme = 0;
	var armeMax;
	var lieu = 0;
	var lieuMax;
	var perso = 0;
	var persoMax;
	var idx;

	var game;
	game = {};
	game.cartes = [];



	cartes.personnages = melanger_cartes(cartes.personnages);
	cartes.lieux = melanger_cartes(cartes.lieux);
	cartes.armes = melanger_cartes(cartes.armes);

	for (idx = 0; idx < 3; idx++)
	{
		game.cartes[idx] = [];

		if (idx === 0)
		{
			lieuMax = 2;
			armeMax = 2;
			persoMax = 2;
		}
		else if (idx === 1)
		{
			lieuMax = 5;
			armeMax = 3;
			persoMax = 4;
		}
		else if (idx === 2)
		{
			lieuMax = 8;
			armeMax = 5;
			persoMax = 5;
		}

		while (lieu < lieuMax)
		{
			game.cartes[idx].push(cartes.lieux[lieu]);
			lieu++;
		}

		while (arme < armeMax)
		{
			game.cartes[idx].push(cartes.armes[arme]);
			arme++;
		}

		while (perso < persoMax)
		{
			game.cartes[idx].push(cartes.personnages[perso]);
			perso++;
		}
	}
	return (game);
};

var vivant = function(hote,joueurs){
	var joueur_vivant = [];
	var i;
	for(i=0; i<joueurs.length; i++)
	{
		joueur_vivant[i] = joueurs[i];
	}
	return joueur_vivant;
};

var position = function (pos) {
	pos = [];

	pos[0] = [7, 1];
	pos[1] = [1,17];
	pos[2] = [17, 23];

	return (pos);
}

var generer_json = function(hote, joueurs){
	var scenario = generer_scenario(cartes_copie);
	var game = distribuer_carte(cartes_copie);
	var i;
	game.scenario = scenario;
	game.vivant = vivant(hote, joueurs);
	game.actif = 0;
	game.position = position(game.position);
	game.mort = [];
	game.historique ={};
	for(i = 0; i<joueurs.length; i++){
		game.historique[joueurs[i]] = [];
	}
	game = JSON.stringify(game);
	fs.writeFileSync(hote+".json", game, "UTF-8");

};

//generer_json("dede", ["dede","melvin","dan"]);

module.exports = generer_json;
