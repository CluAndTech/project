var fs = require("fs");
var cartes = {};
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

var generer_scenario = function(cartes){

var scenario = {};
var random;
random = Math.floor(Math.random() * 6);
scenario.personnages = cartes.personnages[random];
random = Math.floor(Math.random() * 9);
scenario.lieux = cartes.lieux[random];
random = Math.floor(Math.random() * 6);
scenario.armes = cartes.armes[random];
return scenario;
};

var distribuer_cartes = function(cartes, joueurs)
{
var idx;
for(idx = 0; idx < joueurs.length; idx++);
{



}


};

var generer_json = function(hote, joueurs){

var scenario = generer_scenario(cartes);
var cartes_joueurs = distribuer_cartes(cartes, joueurs);
scenario = JSON.stringify(scenario);
fs.writeFileSync(hote+".json", scenario, "UTF-8");

};

generer_json("dede", ["dede","melvin","dan"]);

module.exports = generer_json;
