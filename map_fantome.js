"use strict";

var fs = require("fs");
require('remedial');
var deplacer = require("./req_deplacer.js");

var grille = [

[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,3,3,3,3,3,0,1,1,1,0,3,3,3,3,3,3,0,1,0,3,3,3,0],
[0,3,3,3,3,3,0,1,1,1,0,3,3,3,3,3,3,0,1,0,3,3,3,0],
[0,3,3,3,3,3,0,1,1,1,0,3,3,3,3,3,3,0,1,0,3,3,3,0],
[0,3,3,3,3,3,0,1,1,1,13,3,3,3,3,3,3,13,1,0,0,3,3,0],
[0,0,0,0,4,0,0,1,1,1,0,3,3,3,3,3,3,0,1,1,0,0,12,0],
[0,1,1,1,1,1,1,1,1,1,0,0,13,0,0,13,0,0,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
[0,3,3,3,3,0,0,0,0,1,1,0,0,0,0,0,1,1,0,3,3,3,3,0],
[0,3,3,3,3,3,3,3,0,1,1,0,3,3,3,0,1,1,0,3,3,3,3,0],
[0,3,3,3,3,3,3,3,0,1,1,0,3,3,3,0,1,1,0,0,0,0,11,0],
[0,3,3,3,3,3,3,3,5,1,1,0,3,3,3,0,1,1,1,1,1,1,1,0],
[0,3,3,3,3,3,3,3,0,1,1,0,3,3,3,0,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,5,0,1,1,0,3,3,3,0,1,1,0,3,3,3,3,0],
[0,1,1,1,1,1,1,1,1,1,1,0,3,3,3,0,1,0,0,3,3,3,3,0],
[0,1,1,1,1,1,1,1,1,1,1,0,0,9,0,0,1,10,3,3,3,3,3,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,3,3,3,3,0],
[0,0,0,6,0,0,0,0,1,1,0,0,0,7,0,0,1,1,0,0,0,0,0,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,1,1,1,1,1,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,1,1,1,1,1,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,0,8,0,0,0,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,0,3,3,3,3,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,0,3,3,3,3,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

];

var grille2 = [

[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,3,3,3,3,3,0,14,1,1,0,3,3,3,3,3,3,0,1,0,3,3,3,0],
[0,3,3,3,3,3,0,1,1,1,0,3,3,3,3,3,3,0,1,0,3,3,3,0],
[0,3,3,3,3,3,0,1,1,1,0,3,3,3,3,3,3,0,1,0,3,3,3,0],
[0,3,3,3,3,3,0,1,1,1,13,3,3,3,3,3,3,13,1,0,0,3,3,0],
[0,0,0,0,4,0,0,1,1,1,0,3,3,3,3,3,3,0,1,1,0,0,12,0],
[0,1,1,1,1,1,1,1,1,1,0,0,13,0,0,13,0,0,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
[0,3,3,3,3,0,0,0,0,1,1,0,0,0,0,0,1,1,0,3,3,3,3,0],
[0,3,3,3,3,3,3,3,0,1,1,0,3,3,3,0,1,1,0,3,3,3,3,0],
[0,3,3,3,3,3,3,3,0,1,1,0,3,3,3,0,1,1,0,0,0,0,11,0],
[0,3,3,3,3,3,3,3,5,1,1,0,3,3,3,0,1,1,1,1,1,1,1,0],
[0,3,3,3,3,3,3,3,0,1,1,0,3,3,3,0,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,5,0,1,1,0,3,3,3,0,1,1,0,3,3,3,3,0],
[0,15,1,1,1,1,1,1,1,1,1,0,3,3,3,0,1,0,0,3,3,3,3,0],
[0,1,1,1,1,1,1,1,1,1,1,0,0,9,0,0,1,10,3,3,3,3,3,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,3,3,3,3,0],
[0,0,0,6,0,0,0,0,1,1,0,0,0,7,0,0,1,1,0,0,0,0,0,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,1,1,1,1,1,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,1,1,1,1,1,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,0,8,0,0,0,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,16,0,3,3,3,3,0],
[0,3,3,3,3,3,3,0,1,1,0,3,3,3,3,0,1,1,0,3,3,3,3,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

];

var map = function (req, res, query) {

	var marqueurs;
	var page;

	var mur = "<td style=\"background-image: url(mur.png);\"><img src=\"vide.png\">";
	var couloir = "<td style=\"background-image: url(couloir.png);\"><img src=\"vide.png\">";
	var salle = "<td style=\"background-image: url(salle.png);\"><img src=\"vide.png\">";
	var pion1 = "<img src=\"pion1.png\"/>";
	var pion2 = "<img src=\"pion2.png\"/>";
	var pion3 = "<img src=\"pion3.png\"/>";

	var grille3 = deplacer(5, grille, 1, 7);
    console.log(grille3);


	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('map_fantome.html', 'utf-8');

	marqueurs = {};
	var i,j;
	marqueurs.map = "<table>";
	
	for(j=0; j<25; j++)
	{
	marqueurs.map += "<tr>";
	for(i=0; i<24; i++)
	{
		if(grille[j][i] === 0)
		{
		marqueurs.map += mur;
		}
		else if(grille[j][i] === 1)
		{
		marqueurs.map += couloir;
		}
		else if(grille[j][i] === 3)
		{
		marqueurs.map += salle;
		}
		else if(grille[j][i] > 3&&grille[j][i]<14)
		{
		marqueurs.map += salle;
		} 
		if(grille2[j][i] === 14)
		{
		marqueurs.map += pion1;
		}
		else if(grille2[j][i] === 15)
		{
		marqueurs.map += pion2;
		}
		else if(grille2[j][i] === 16)
		{
		marqueurs.map += pion3;
		}
		if(grille3[j][i] === 2)
		{
		marqueurs.map += "<a href=\"/deplacer?x="+i+"&y="+j+"\">"+"<img src=\"pion3.png\"</a>";
		}

	}
	marqueurs.map += "</tr>";
	}
	marqueurs.map += "</table>";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = map;
