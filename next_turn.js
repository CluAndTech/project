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

	var game;
	game = fs.readFileSync(host + ".json", "UTF-8");
	game = JSON.parse(game);

	game.actif = (game.actif + 1) % (game.vivant.length);

	game = JSON.stringify(game);
	fs.writeFileSync(host + ".json", game, "UTF-8");
	game = JSON.parse(game);
	if(game.mort === game.vivant[game.actif]){
		next_turn(host);
	}

}

module.exports = next_turn;
