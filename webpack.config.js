const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isDevelopment = process.env.NODE_ENV === "development";

const extractLess = new ExtractTextPlugin({
  filename: 'style.css',
  disable: isDevelopment
});
const plugins = [
  extractLess
];
if (!isDevelopment) {
  plugins.push(new webpack.optimize.UglifyJsPlugin);
}


module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist/public')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      }
    ],
  },
  devtool: '#source-map',
  plugins
};
