/*
 * @Author: lushijie
 * @Date:   2016-11-11 16:28:28
 * @Last Modified by:   lushijie
 * @Last Modified time: 2016-12-29 17:56:53
 */

var path = require('path');
var webpack = require('webpack');
var base = path.join(__dirname);
var isDev = JSON.parse(JSON.stringify(process.env.NODE_ENV || 'development')) == 'development';


var vendors = [
  'autobind-decorator',
  'babel-polyfill',
  'classnames',
  'moment',
  'react',
  'react-dom',
  'react-router',
  'reqwest',
];

module.exports = {
  cache: true,
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, '..','dist'),
    library: '[name]_[chunkhash]',
    filename: '[name].bundle.js',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'manifest.json'),
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(isDev ? "development" : "production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      except: ['$super', '$', 'exports', 'require']
    }),
  ],
};
