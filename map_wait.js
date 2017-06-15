/*
 ** File Name : map_wait.js
 ** Creation Date : 13-06-2017
 ** Last Modified : Thu 15 Jun 2017 11:26:30 CEST
 ** Created by : Melvin DELPIERRE
 ** NOTE : AFFICHAGE DE LA PAGE POUR LES JOUEURS PASSIFS
 */

"use strict";

var fs = require("fs");
var afficher_cartes = require("./afficher_carte.js");

var map_wait = function(host, marqueurs){

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

	var mur = "<td style='background-image: url(mur.png)'>";
	var couloir = "<td style='background-image: url(couloir.png)'>";
	var salle = "<td style='background-image: url(salle.png)'>";
	var vide = '<img src="vide.png"/>';
	var pion1 = "<img src=\"pion1.png\"/>";
	var pion2 = "<img src=\"pion2.png\"/>";
	var pion3 = "<img src=\"pion3.png\"/>";

	var game = JSON.parse(fs.readFileSync(host + ".json", "UTF-8"));

	//	AFFICHER LE PLATEAU DE JEU
	var i,j;
	marqueurs.map = "<table>";

	for(j=0; j<25; j++)
	{
		marqueurs.map += "<tr>";
		for(i=0; i<24; i++)
		{
			if(grille[j][i] === 0)
			{
				marqueurs.map += mur + vide;
			}
			else if(grille[j][i] === 1)
			{
				marqueurs.map += couloir;
	/*			
				console.log("x = " + game.position[0][1] + " | j = " + j);
					console.log("y = " + game.position[0][0] + " | i = " + i);
					console.log();
					console.log();
					console.log(marqueurs.map);
	*/

				if (Number(game.position[0][0]) === j && Number(game.position[0][1]) === i)
				{				
					console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
					marqueurs.map += pion1;
				}
				else if (Number(game.position[1][0]) === j && Number(game.position[0][1]) === i)
				{
					marqueurs.map += pion2;
				}
				else if (Number(game.position[2][0]) === i && Number(game.position[2][1]) === j)
				{
					marqueurs.map += pion3;
				}
				else
				{
					marqueurs.map += vide;
				}
			}
			else if(grille[j][i] === 3)
			{
				marqueurs.map += salle;
			}
			else if(grille[j][i] > 3&&grille[j][i]<14)
			{
				marqueurs.map += salle;
			}
		}
		marqueurs.map += "</tr>";
	}
	marqueurs.map += "</table>";

	game.map = marqueurs.map;
//	console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
//	console.log(game.map);

	game = JSON.stringify(game);
	fs.writeFileSync(host + ".json", game, "UTF-8");

	return (marqueurs);


/*
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
*/
}

module.exports = map_wait;
