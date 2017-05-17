"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var compte;
	var mdp;
	var page;
	var nouveauMembre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].compte === query.compte) {
			trouve = true;
		}
		i++;
	}

	// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

	

	if(trouve === false) {
		nouveauMembre = {};
		nouveauMembre.compte = query.compte;
		nouveauMembre.mdp = query.mdp;
		if(query.compte === "" || query.mdp === "") {
     		page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');
			marqueurs = {};
			marqueurs.erreur = "ERREUR : Champ(s) non complété(s)";
			marqueurs.compte = query.compte;
			page = page.supplant(marqueurs);
		}
		else {
		listeMembres[listeMembres.length] = nouveauMembre;

		contenu_fichier = JSON.stringify(listeMembres);

		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
		}
	}


	// ON RENVOIT UNE PAGE HTML 

	if(trouve === true) {
		// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

		page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : ce compte existe déjà";
		marqueurs.compte = query.compte;
		page = page.supplant(marqueurs);

	} else if(query.compte !== "" && query.mdp !== ""){
		// SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION

		page = fs.readFileSync('modele_confirmation_inscription.html', 'UTF-8');

		marqueurs = {};
		marqueurs.compte = query.compte;
		marqueurs.mdp = query.mdp;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
