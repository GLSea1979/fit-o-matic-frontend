'use strict';

const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

dotenv.load();

module.exports = {
  devtool: 'eval',
  entry: `${__dirname}/app/entry.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`
  },
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/app/index.html`
    }),
    new FaviconsPlugin(
      {
        logo:`${__dirname}/assets/fit-O-matic-icon-lg.png`,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          favicons: true,
          firefox: true,
          opengraph: true,
          twitter: true,
        }
      }
    ),
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(process.env.API_URL),
      __DEBUG__: JSON.stringify(!production),
      __defaultUserPhoto__: JSON.stringify(`/assets/user-anon.jpg`)
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        include: /[app, assets]/,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'

      },
      {
        test: /\.(eot|woff|ttf|svg|otf).*/,
        include:/node_modules/,
        loader: 'url-loader?limit=100000&name=fonts/[hash].[ext]'
      }
    ]
  }
};
