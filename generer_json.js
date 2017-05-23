"use strict";
var fs = require("fs");
var cartes = {};
var cartes_copie;
cartes.personnages = [];
cartes.personnages[0] = "mme Dorignac";
cartes.personnages[1] = "m Thire";
cartes.personnages[2] = "m Sanchez";
cartes.personnages[3] = "mme Danesi";
cartes.personnages[4] = "m Lallite";
cartes.personnages[5] = "m Fripiat";
cartes.lieux = [];
cartes.lieux[0] = "open space";
cartes.lieux[1] = "administration";
cartes.lieux[2] = "salle de cours";
cartes.lieux[3] = "buvette";
cartes.lieux[4] = "salle informatique";
cartes.lieux[5] = "salle serveurs";
cartes.lieux[6] = "exterieur";
cartes.lieux[7] = "toilettes";
cartes.lieux[8] = "bureaux profs";
cartes.armes = [];
cartes.armes[0] = "dictionnaire";
cartes.armes[1] = "ordinateur";
cartes.armes[2] = "chaise";
cartes.armes[3] = "cable RJ45";
cartes.armes[4] = "extincteur";
cartes.armes[5] = "nokia 3310";
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
		console.log(cartes.personnages);
		console.log(perso);
		
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
			console.log(cartes.personnages[perso]);
			perso++;
		}
	}
	return (game);
};

var generer_json = function(hote, joueurs){
	var scenario = generer_scenario(cartes_copie);
	var game = distribuer_carte(cartes_copie);
	game.scenario = scenario;
	game = JSON.stringify(game);
	fs.writeFileSync(hote+".json", game, "UTF-8");

};

generer_json("dede", ["dede","melvin","dan"]);

module.exports = generer_json;
