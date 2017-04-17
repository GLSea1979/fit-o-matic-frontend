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
          android: false,
          appleIcon: false,
          appleStartup: false,
          favicons: true,
          firefox: false,
          opengraph: false,
          twitter: false,
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
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'

      },
    ]
  }
};
