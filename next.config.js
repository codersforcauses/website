const withSass = require('@zeit/next-sass')
const Dotenv = require('dotenv-webpack')

module.exports = withSass({
  webpack: config => {
    config.plugins.push(new Dotenv({ silent: true }))
    return config
  }
})
