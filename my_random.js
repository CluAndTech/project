// MANIPULATION DE LA CHANCE

"use strict";

var tab = [5, 8, 11];
var idx = -1;

var my_random = function () {
    idx++;
    return (tab[idx]);
};

module.exports = my_random;