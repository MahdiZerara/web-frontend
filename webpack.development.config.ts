// Dependencies
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { merge } from 'webpack-merge';
import { srcDirectories, distDirectories, sharedConfigs } from './webpack.shared';
import { devConfigs } from './configs/environments';

// Webpack configs
export default merge(sharedConfigs, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    path: distDirectories,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[local]'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[local]'
              }
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(srcDirectories, 'index.html'),
      meta: {
        robots: 'noindex, nofollow'
      }
    }),
    new webpack.DefinePlugin({
      'process.env': devConfigs as any
    })
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 8080,
    server: 'https',
    static: [
      {
        directory: distDirectories,
        serveIndex: true,
        watch: true
      }
    ],
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    devMiddleware: {
      writeToDisk: true
    }
  }
} as webpack.Configuration);
