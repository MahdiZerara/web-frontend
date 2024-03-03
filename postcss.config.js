// Dependencies
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');

// Configs
module.exports = {
  plugins: [
    postcssImport({}),
    postcssPresetEnv({
      preserve: false
    }),
    cssnano({}),
    purgecss({
      content: ['./src/**/*.html', './src/**/*.tsx'],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
};
