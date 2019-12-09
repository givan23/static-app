const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pjson = require('./package.json');


module.exports = env => {


  return {
    mode: 'development',
    entry: {
      clientlib: './scripts/clientlib.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([
        {from: 'index.html'},
        {from: './images', to: './images'},
        {from: './fonts', to: './fonts'}
      ]),
      new MiniCssExtractPlugin({filename: `[name].css`}),
      new WriteFilePlugin(),
    ],
    module: {

      rules: [
        {
          test: /\.less$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader',
              options: {
                modifyVars: {
                  '@type-theme': `'${pjson.mavenConfig[env.NODE_TYPE].theme}'`
                }
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.html/,
          loader: 'file-loader',
          options: {name: '[name].[ext]'}
        }
      ],
    },
    resolve: {extensions: ['.js', '.less']},
  }
};