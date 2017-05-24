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

		if(cd.l - 1 >= 1 && grille[cd.l - 1][cd.c] === 1) {
			ncd.l = cd.l - 1;
			ncd.c = cd.c;
			if(n > 1) {
				can(ncd, n-1);
			} else {
				grille_ca[ncd.l][ncd.c] = 2;
			}
		}

		if(cd.l + 1 < grille.length && grille[cd.l + 1][cd.c] === 1) {
			ncd.l = cd.l + 1;
			ncd.c = cd.c;
			if(n > 1) {
				can(ncd, n-1);
			} else {
				grille_ca[ncd.l][ncd.c] = 2;
			}
		}

		if(cd.c - 1 >= 1 && grille[cd.l][cd.c - 1] === 1) {
			ncd.l = cd.l;
			ncd.c = cd.c - 1;
			if(n > 1) {
				can(ncd, n-1);
			} else {
				grille_ca[ncd.l][ncd.c] = 2;
			}
		}


		if(cd.c + 1 < grille[cd.l].length && grille[cd.l][cd.c + 1] === 1) {
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
			if(grille[l][c] === 0) {
				process.stdout.write("# ");
			} else if(cd.l ===l && cd.c === c) {
				process.stdout.write("X ");
			} else if(grille[l][c] === 2 ) {
				process.stdout.write("o ");
			} else if(grille[l][c] === 3) {
				process.stdout.write("  ");
			} else if(grille[l][c] === 4) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 5) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 6) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 7) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 8) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 9) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 10) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 11) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 12) {
				process.stdout.write("* ");
			} else if(grille[l][c] === 13) {
				process.stdout.write("* ");
			} else {
				process.stdout.write(". ");
			}
		}
		console.log("");
	}
}

//==========================================================================

grille = [

[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,3,3,3,3,3,0,1,1,0,3,3,3,3,3,3,3,0,1,0,0,0,0,0],
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
[0,0,0,0,0,0,0,1,0,1,1,0,3,3,3,0,1,1,0,3,3,3,3,0],
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

process.stdout.write("? ");
n = Number(kbd.getLineSync());

cd = {"l": 7, "c": 11};
grille_ca = calcul_ca(grille, cd, n);

display_grille(grille_ca, cd);
