/* 
 **File name : verif_salle.js
 ** Creation Date : 08-06-2017
 ** Created by : Dan CHICHE, Theo DE OLIVEIRA 
 */

"use strict";

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


	var verif_salle = function(x,y){	
	var position;


		if(grille[x][y] > 3 && grille[x][y] <= 13&&grille[x][y]!== 9){
		   position = "salle";
		} else if(grille[x][y] === 1){
		  	position = "couloir";
		} else if(grille[x][y] === 9){ 
			position = "salle_accusation"
		}
		console.log(position)
		return position
	};

module.exports = verif_salle;