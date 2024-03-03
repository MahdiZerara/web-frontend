const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  env: {
    API_URL: 'https://staging.mysite.com/api',
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./plugins/index.ts')(on, config)
    },
    specPattern: 'tests/e2e/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false /* 'tests/e2e/support/index.ts' */,
    baseUrl: 'https://staging.mysite.com',
  },
})
