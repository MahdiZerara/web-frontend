// Dependencies
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { resolve } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// Directories
export const srcDirectories = resolve(__dirname, 'src');
export const distDirectories = resolve(__dirname, 'dist');

// Webpack configs
export const sharedConfigs = {
    target: ['web', 'es5'],
    entry: {
        app: resolve(srcDirectories, 'main.tsx')
    },
    output: {
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@src': resolve(srcDirectories, '')
        }
    },
    plugins: [
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(),
        new StylelintPlugin({
            fix: true
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx']
        })
    ]
} as webpack.Configuration;
