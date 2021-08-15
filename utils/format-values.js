module.exports = (vals) => vals.map(val => `"${String(val)}"`).join(', ');
