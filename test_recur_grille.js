// TEST ALGO CASES ATTEIGNABLES EN n COUPS DANS UNE GRILLE

"use strict";

var kbd = require ('kbd');
var grille;
var grille_ca;
var cd;                    // case depart
var n;

//==========================================================================

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

		if(cd.l - 1 >= 0 && grille[cd.l - 1][cd.c] === 0) {
			ncd.l = cd.l - 1;
			ncd.c = cd.c;
			if(n > 1) {
				can(ncd, n-1);
			} else {
				grille_ca[ncd.l][ncd.c] = 2;
			}
		}

		if(cd.l + 1 < grille.length && grille[cd.l + 1][cd.c] === 0) {
			ncd.l = cd.l + 1;
			ncd.c = cd.c;
			if(n > 1) {
				can(ncd, n-1);
			} else {
				grille_ca[ncd.l][ncd.c] = 2;
			}
		}

		if(cd.c - 1 >= 0 && grille[cd.l][cd.c - 1] === 0) {
			ncd.l = cd.l;
			ncd.c = cd.c - 1;
			if(n > 1) {
				can(ncd, n-1);
			} else {
				grille_ca[ncd.l][ncd.c] = 2;
			}
		}


		if(cd.c + 1 < grille[cd.l].length && grille[cd.l][cd.c + 1] === 0) {
			ncd.l = cd.l;
			ncd.c = cd.c + 1;
			if(n > 1) {
				can(ncd, n-1);
			} else {
				grille_ca[ncd.l][ncd.c] = 2;
			}
		}
	}

	can(cd, n);

	return grille_ca;
	
}

//==========================================================================

var display_grille = function(grille, cd) {
	var l, c;
	for(l=0; l<grille.length; l++) {
		for(c=0; c<grille[l].length; c++) {
			if(grille[l][c] === 1) {
				process.stdout.write("# ");
			} else if(cd.l ===l && cd.c === c) {
				process.stdout.write("X ");
			} else if(grille[l][c] === 2) {
				process.stdout.write("o ");
			} else {
				process.stdout.write(". ");
			}
		}
		console.log("");
	}
}

//==========================================================================

grille = [
	[1, 0, 0, 1, 0, 0, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
	[1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 1, 0, 0, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 0, 1, 1, 0]
];

process.stdout.write("? ");
n = Number(kbd.getLineSync());

cd = {"l": 5, "c": 2};
grille_ca = calcul_ca(grille, cd, n);

display_grille(grille_ca, cd);
