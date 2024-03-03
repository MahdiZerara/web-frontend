// Dependencies
const path = require('path');

// Directories
const configsFolder = path.resolve(__dirname, 'configs');

// Jest configs
module.exports = {
    verbose: true,
    collectCoverage: true,
    rootDir: './src',
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    preset: 'ts-jest',
    coverageDirectory: '../coverage',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: ['./**/*.{ts,tsx,js,jsx}'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.resolve(configsFolder, '__mocks__/jest/file.mock.ts'),
        '\\.(css|less|scss|sass)$': path.resolve(configsFolder, '__mocks__/jest/style.mock.ts')
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageThreshold: {
        //
    }
};
