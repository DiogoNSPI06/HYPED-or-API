 var version = require("../src/upgrades.js")
 
 var yiff_module = {
	e621: require('../src/furry-modules/e6.js'),
	e926: require('../src/furry-modules/e6.js'),
	yiff: require('../src/furry-modules/furry/nsfw.js')
 };
version.checkForUpdates()

module.exports = yiff_module