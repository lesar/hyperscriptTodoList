/*
 * vedi https://github.com/petehunt/webpack-howto
 *
 */

var webpack = require('webpack');
const merge = require('webpack-merge');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new TypedocWebpackPlugin({
      out: './docs',
    	module: 'ES6',
    	target: 'ES6',
    	exclude: '**/node_modules/**/*.*',
    	experimentalDecorators: true,
    	excludeExternals: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        ecma: 6
      },
      extractComments: true,
      //test: /\.js($|\?)/i
    }),
  ]
});
