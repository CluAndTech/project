/*
 * Version 2 de la fonction map_afficher 
 */
"use strict";
var fs = require("fs");
var deplacer = require("./req_deplacer.js");
var map_afficher = function(n,l,c,query)
{
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

	var vide = '<img src="vide.png"/>';
	var pion1 = "<img src=\"pion1.png\"/>";
	var pion2 = "<img src=\"pion2.png\"/>";
	var pion3 = "<img src=\"pion3.png\"/>";
	var croix = "<img src=\"croix.png\"/>";

	var mur = "<td style='background-image: url(mur.png)'>"
	var couloir = "<td style='background-image: url(couloir.png)'>";
	var salle = "<td style='background-image: url(salle.png)'>"


	var marqueurs = {};
	var grille2 = deplacer(n, grille,l, c);
	var x,y;

	var game = fs.readFileSync(query.hote+".json", "UTF-8");
	game = JSON.parse(game);
	marqueurs.map = "<table>";
	for(y=0; y<25; y++)
	{

		marqueurs.map += "<tr>";
		for(x=0; x<24; x++)
		{

			// generation du backround

			if(grille[y][x] === 0)
			{
				marqueurs.map += mur;
			}
			else if(grille[y][x] === 1)
			{
				marqueurs.map += couloir;
			}
			else if(grille[y][x] >= 3)
			{
				marqueurs.map += salle;
			}

			// generation des pions ou du vide

			//console.log("x :"+game.position[0][0]);
			//console.log("y :"+game.position[0][1]);
			if(game.position[0][0] === x && game.position[0][1] === y)
			{
				marqueurs.map += pion1;
			}
			else if(game.position[1][0] === x && game.position[1][1] === y)
			{
				marqueurs.map += pion2;
			}
			else if(game.position[2][0] === x && game.position[2][1] === y)
			{
				marqueurs.map += pion3;
			}
			else if(grille2[y][x] === 2)
			{
	                        marqueurs.map += "<a href=\"/jeu?action=deplacement&x="+x+"&y="+y+"&compte="+query.compte+"&hote="+query.hote+"\">"+"<img src=\"croix.png\"</a>";
			}
			else
			{
				marqueurs.map += vide;
			}
		}
		marqueurs.map += "</tr>";
	}
	marqueurs.map += "</table>";
	return marqueurs.map;

};

module.exports = map_afficher;

