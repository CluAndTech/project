/*
** File Name : next_turn.js
** Creation Date : 12-06-2017
** Last Modified : Mon 12 Jun 2017 14:08:13 CEST
** Created by : Melvin DELPIERRE
** NOTE : Change turn
*/

"use strict";

var fs = require("fs");

var next_turn = function(host){
	
    var idx;
	var game;
	game = fs.readFileSync(host + ".json", "UTF-8");
	game = JSON.parse(game);

	game.actif = (game.actif + 1) % (game.vivant.length);

	game = JSON.stringify(game);
	fs.writeFileSync(host + ".json", game, "UTF-8");
	game = JSON.parse(game);
	for(idx = 0; idx<game.mort.length-1;idx++){
	    if(game.mort[idx] === game.vivant[game.actif]) {
		    next_turn(host);
        } else {
            game = require(host + ".json");
            for (idx = 0; idx < game.vivant.length; idx++) {
                game.historique[game.vivant[idx]].push("C'est au tour de " + game.vivant[game.actif] + " de jouer ! ");
            }
            game = JSON.stringify(game);
            fs.writeFileSync(host + ".json", game, "UTF-8");
        }
	    break;
    }
}

module.exports = next_turn;
