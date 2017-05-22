/*
**File name : req_jeu.js
** Creation Date : 22-05-2017
** Last Modified : Mon 22 May 2017 13:59:20 CEST
** Created by : Melvin DELPIERRE
** NOTE :
*/

"use strict";

var fs = require("fs");
require('remedial');

var jeu = function(req,res,query){


var marqueurs = {};
var page;
var idx;
var FirstD;
var SecondD;

marqueurs.FirstD = "";
marqueurs.SecondD = "";
marqueurs.total = "";
marqueurs.compte = query.compte;
marqueurs.hote = query.hote;

if(query.action === "actif"){

page = fs.readFileSync("plateau_actif.html", "utf-8");

}

if(query.action === "passif"){

page = fs.readFileSync("plateau_passif.html", "utf-8");

}

if(query.action === "lancerD"){


marqueurs.FirstD = Number(Math.floor(Math.random()*6)+1);
marqueurs.SecondD = Number(Math.floor(Math.random()*6)+1);
marqueurs.total = marqueurs.FirstD + marqueurs.SecondD;
page = fs.readFileSync("plateau_deplacement.html","utf-8");
}

page = page.supplant(marqueurs);
res.write(page);
res.end();

};

module.exports = jeu;




