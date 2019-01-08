const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  node: {
    // Solde Joi issue : Cannot resolve module 'net'
    // Fix ref: https://github.com/hapijs/joi/issues/665
    net: 'empty'
  },
  externals: {
    'react': 'commonjs react'
  }
}
