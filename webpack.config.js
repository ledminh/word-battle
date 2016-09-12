var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './index.jsx',
  output: {
    path: __dirname + "/views",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx*$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=25000'
      }
    ]
  }/*,

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]*/,
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
