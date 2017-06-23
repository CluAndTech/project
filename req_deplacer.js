/*
** req_deplacer.js
** TEST ALGO CASES ATTEIGNABLES EN n COUPS DANS UNE GRILLE
*/
"use strict";

var grille;
var grille_ca;
var cd;                    // case depart
var n;

//==========================================================================
var deplacer = function(n, grille, l, c){

	var calcul_ca = function(grille, cd, n) {
		var grille_ca;
		var l, c;

		grille_ca = [];
		for(l=0; l<grille.length; l++) {
			grille_ca[l] = [];
			for(c=0; c<grille[l].length; c++) {
				grille_ca[l][c] = grille[l][c];
			}
		}

		var can = function can (cd, n) {
			var dl, dc;
			var ncd;

			ncd = {};

			if(cd.l - 1 >= 1 && (grille[cd.l - 1][cd.c] === 1 || grille[cd.l - 1][cd.c] >=4)) {
				ncd.l = cd.l - 1;
				ncd.c = cd.c;
				if(n > 1 && grille_ca[ncd.l][ncd.c]<4) {
					can(ncd, n-1);
				} else {
					grille_ca[ncd.l][ncd.c] = 2;
				}
			}

			//console.log("grille.length = " + grille.length);
			//console.log("cd.l = " + cd.l);
			//console.log("grille[cd.l] = " + grille[cd.l]);
			//console.log(aerafezf);
			try {
			if(cd.l + 1 >= 1 && (grille[cd.l + 1][cd.c] === 1 || grille[cd.l + 1][cd.c] >=4)) {
				ncd.l = cd.l + 1;
				ncd.c = cd.c;
				if(n > 1 && grille_ca[ncd.l][ncd.c]<4) {
					can(ncd, n-1);
				} else {
					grille_ca[ncd.l][ncd.c] = 2;
				}
			}
			} catch (e){};

			if(cd.c - 1 >= 1 &&(grille[cd.l][cd.c-1] === 1|| grille[cd.l][cd.c-1] >=4)) {
				ncd.l = cd.l;
				ncd.c = cd.c - 1;
				if(n > 1 && grille_ca[ncd.l][ncd.c]<4) {
					can(ncd, n-1);
				} else {
					grille_ca[ncd.l][ncd.c] = 2;
				}
			}


			if(cd.c + 1 >= 1 &&(grille[cd.l][cd.c+1] === 1|| grille[cd.l][cd.c+1] >=4)) {
				ncd.l = cd.l;
				ncd.c = cd.c + 1;
				if(n > 1 && grille_ca[ncd.l][ncd.c]<4) {
					can(ncd, n-1);
				} else {
					grille_ca[ncd.l][ncd.c] = 2;
				}
			}
		}
		can(cd, n);

		return grille_ca;

	};

	//==========================================================================

	var display_grille = function(grille, cd) {
		var l, c;
		for(l=0; l<grille.length; l++) {
			for(c=0; c<grille[l].length; c++) {
				if(grille[l][c] === 0) {
					process.stdout.write("# ");
				} else if(cd.l ===l && cd.c === c) {
					process.stdout.write("X ");
				} else if(grille[l][c] === 2 ) {
					process.stdout.write("o ");
				} else if(grille[l][c] === 3) {
					process.stdout.write("  ");
				} else if(grille[l][c] >= 4) {
					process.stdout.write("* ");
				} else {
					process.stdout.write(". ");
				}
			}
			console.log("");
		}
	}

	//==========================================================================

	/*grille = [

	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	  [0,3,3,3,3,3,0,1,1,0,3,3,3,3,3,3,3,0,1,0,3,3,3,0],
	  [0,3,3,3,3,3,0,1,1,0,3,3,3,3,3,3,3,0,1,0,3,3,3,0],
	  [0,3,3,3,3,3,0,1,1,0,3,3,3,3,3,3,3,0,1,0,3,3,3,0],
	  [0,3,3,3,3,3,0,1,1,13,3,3,3,3,3,3,3,13,1,0,0,3,3,0],
	  [0,0,0,0,4,0,0,1,1,0,3,3,3,3,3,3,3,0,1,1,0,0,12,0],
	  [0,1,1,1,1,1,1,1,1,0,0,13,0,0,0,13,0,0,1,1,1,1,1,0],
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
	 */

	//process.stdout.write("? ");

	cd = {"l": l, "c": c};
	grille_ca = calcul_ca(grille, cd, n);
	return grille_ca;

	//display_grille(grille_ca, cd);
}

module.exports = deplacer;
