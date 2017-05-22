/*
** File Name : kick.js
** Creation Date : 18-05-2017
** Last Modified : Mon 22 May 2017 14:00:27 CEST
** Created by : Melvin DELPIERRE
** NOTE : timeout players
*/

"use strict";

var kick = function (host, account) {
	var fs = require("fs");
	var actualTime;
	var delay;
	var lobby;
	var idx;

	actualTime = Math.floor(Date.now() /1000);
	lobby = fs.readFileSync("lobby.json", "UTF-8");
	lobby = JSON.parse(lobby);

	for (idx = 0; idx < lobby[host].joueurs.length; idx++)
	{
		if (account === lobby[host].joueurs[idx])
		{
			lobby[host].time[idx] = actualTime;	
		}

		delay = actualTime - lobby[host].time[idx];
		console.log(lobby[host].joueurs[idx] + "'s delay = " + delay);

		if (delay > 10)
		{
			lobby[host].joueurs.splice(idx, 1);
			lobby[host].time.splice(idx, 1);
		}
	}

	lobby = JSON.stringify(lobby);
	fs.writeFileSync("lobby.json", lobby, "UTF-8");
};

module.exports = kick;
