/*
 * vedi https://github.com/petehunt/webpack-howto
 *
 */

var webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new TypedocWebpackPlugin({
      out: './dist/docs',
    	module: 'commonjs',
      mode: 'modules',
    	target: 'es6',
    	exclude: '**/node_modules/**/*.*',
      ignoreCompilerErrors: true,
      includeDeclarations: true,
      name: 'hyperscriptTodoList',
    	experimentalDecorators: true,
    	excludeExternals: true
    }, './src'),
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
