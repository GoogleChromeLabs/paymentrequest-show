const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const src = path.join(__dirname, 'src');
const dst = path.join(__dirname, 'dist');

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: {
    'index': path.join(src, 'index.js')
  },
  output: {
    path: dst,
    filename: '[name].js'
  },
  devServer: {
    contentBase: __dirname,
    port: 8080,
    hot: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: { url: false }
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  plugins: [
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: path.join(src, 'style.css'),
    //     to: path.join(dst, 'style.css')
    //   }]
    // })
  ]
}