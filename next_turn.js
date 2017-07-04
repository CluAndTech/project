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

	game.actif = (game.actif + 1) %3;

	game = JSON.stringify(game);
	fs.writeFileSync(host + ".json", game, "UTF-8");
	game = JSON.parse(game);
	if(game.mort.length !== undefined||game.mort.length !== 0){
	for(idx = 0; idx<3;idx++){
	    if(game.mort[idx] === game.vivant[game.actif]) {
			console.log("lol");
		    next_turn(host);
        	}
    	}
	}
}

module.exports = next_turn;
