const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'chart-explorer': path.resolve(__dirname, 'src/js/ChartExplorer.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    clean: true,
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'),
      },
      {
        directory: path.resolve(__dirname, 'src/images'),
        publicPath: '/images',
      }
    ],
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin()
    ],
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html',
    }),
  ],
};
