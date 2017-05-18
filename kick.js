/*
** File Name : kick.js
** Creation Date : 18-05-2017
** Last Modified : Thu 18 May 2017 11:13:56 CEST
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
	lobby = fs.readFileSync(host+".json", "UTF-8");
	lobby = JSON.parse(lobby);

	for (idx = 0; idx < lobby.membres.length; idx++)
	{
		if (account === lobby.membres[idx])
		{
			lobby.time[idx] = actualTime;	
		}

		delay = actualTime - lobby.time[idx];
		console.log("delay = " + delay);

		if (delay > 10)
		{
			console.log('a');
			lobby.membres.splice(idx, 1);
			lobby.time.splice(idx, 1);
		}
	}

	lobby = JSON.stringify(lobby);
	fs.writeFileSync(host+".json", lobby, "UTF-8");
};

module.exports = kick;
