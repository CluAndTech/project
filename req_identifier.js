"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var compte;
	var mdp;
	var page;
	var membre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].compte === query.compte) {
			if(listeMembres[i].mdp === query.mdp) {
				trouve = true;
			}
		}
		i++;
	}

	// ON RENVOIT UNE PAGE HTML 

	if(trouve === false) {
		// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

		page = fs.readFileSync('modele_accueil.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.compte = query.compte;
		page = page.supplant(marqueurs);

	} else {
		// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

		page = fs.readFileSync('modele_accueil_membre.html', 'UTF-8');
		marqueurs = {};
		var idx;
		var lobby = fs.readFileSync('lobby.json', 'UTF-8');
		lobby = JSON.parse(lobby);
		if(lobby[0] !== undefined)
		{
			marqueurs.lobby = "Lobby déja créé : <br/>" + lobby[0];
			marqueurs.bouton = "<form action=\"/lobby\" method=\"GET\">"
				+"<input type=\"hidden\" name=\"compte\" value="+query.compte+">"
				+"<input type=\"hidden\" name=\"hote\" value="+lobby[0]+">"
				+"<button name=\"action\" value=\"rejoindre\">rejoindre "+lobby[0]+"</button>"
				+"</form>"
		}
		for(idx=1; idx<lobby.length; idx++)
		{
			marqueurs.lobby += "<br/>" + lobby[idx];
			marqueurs.bouton += "<form action=\"/lobby\" method=\"GET\">"
				+"<input type=\"hidden\" name=\"compte\" value="+query.compte+">"
				+"<input type=\"hidden\" name=\"hote\" value="+lobby[idx]+">"
				+"<button name=\"action\" value=\"rejoindre\">rejoindre "+lobby[idx]+"</button>"
				+"</form>"

		}
		marqueurs.compte = query.compte;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
