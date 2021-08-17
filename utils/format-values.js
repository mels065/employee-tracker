const stringifyVal = require("./stringify-val");

module.exports = vals => vals.map((val) => val !== null ? stringifyVal(val) : 'null').join(', ');
