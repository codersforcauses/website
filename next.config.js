const withSass = require('@zeit/next-sass')
const Dotenv = require('dotenv-webpack')

module.exports = withSass({
  webpack: config => {
    config.plugins.push(new Dotenv({ silent: true }))
    return config
  },
  env: process.env.NODE_ENV !== 'development' && {
    BASE_URL: 'https://website-git-website-template.dankestkush.now.sh/',
    MAPBOX_API: process.env.MAPBOX_API,
    PHEME_URL: process.env.PHEME_URL,
    PHEME_TOKEN: process.env.PHEME_TOKEN,
    PHEME_SALT: process.env.PHEME_SALT,
    AMPLIFY_AWS_COGNITO_REGION: process.env.AMPLIFY_AWS_COGNITO_REGION,
    AMPLIFY_AWS_COGNITO_USER_POOLS_ID:
      process.env.AMPLIFY_AWS_COGNITO_USER_POOLS_ID,
    AMPLIFY_AWS_COGNITO_WEB_CLIENT_ID:
      process.env.AMPLIFY_AWS_COGNITO_WEB_CLIENT_ID,
    AMPLIFY_OAUTH_DOMAIN: process.env.AMPLIFY_OAUTH_DOMAIN
  }
})
