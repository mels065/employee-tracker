const stringifyVal = require("./stringify-val");

module.exports = vals => vals.map(stringifyVal).join(', ');
