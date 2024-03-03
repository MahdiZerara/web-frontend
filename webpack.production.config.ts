// Dependencies
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import SitemapPlugin from 'sitemap-webpack-plugin';
import { resolve } from 'path';
import { srcDirectories, distDirectories, sharedConfigs } from './webpack.shared';
import { prodConfigs } from './configs/environments';

// Webpack configs
export default merge(sharedConfigs, {
  mode: 'production',
  output: {
    path: distDirectories,
    filename: 'js/[name].bundle.[contenthash].js',
    chunkFilename: 'js/[name].chunk.[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: {
                localIdentHashDigestLength: 8
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: {
                localIdentHashDigestLength: 8
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['babel-plugin-jsx-remove-data-test-id']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['babel-plugin-jsx-remove-data-test-id']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(srcDirectories, 'index.html'),
      meta: {
        robots: 'index, follow'
      },
      minify: {
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeComments: true,
        keepClosingSlash: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].styles.[contenthash].css',
      chunkFilename: 'css/[name].chunk.[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [{ from: resolve(__dirname, 'configs/robotstxt/prod.txt'), to: resolve(distDirectories, 'robots.txt') }]
    }),
    new SitemapPlugin({
      base: prodConfigs.HOST_URL,
      paths: prodConfigs.SITE_MAP_PATHS as any,
      options: {
        lastmod: true,
        skipgzip: true
      }
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.js(.map)?$|\.css(.map)?$|\.html$|\.(svg|png|jpe?g|bmp|gif)$|\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      minRatio: 1
    }),
    new webpack.DefinePlugin({
      'process.env': prodConfigs as any
    }),
    new ZipPlugin({
      path: '_compressed_',
      filename: 'app.zip'
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          },
          compress: {
            pure_funcs: ['console.log']
          }
        }
      })
    ]
  }
} as webpack.Configuration);
