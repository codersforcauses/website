const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps(withTypescript(withSass()));
