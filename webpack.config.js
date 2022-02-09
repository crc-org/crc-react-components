const path = require('path')

const extract = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const plugins = [
  new extract({filename: "[name].css"})
];

/* A standard nodejs and webpack pattern */
const production = process.env.NODE_ENV === 'production';

/* Only minimize when in production mode */
if (production) {
  plugins.unshift(new CompressionPlugin({
      test: /\.(js|jsx|html|css|ts|tsx)$/,
      deleteOriginalAssets: true
  }));
}

module.exports = {
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    index: "./src/index.ts",
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },

  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.s?css$/,
        use: [
          extract.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
                sourceMap: !production,
                sassOptions: {
                    outputStyle: production ? 'compressed' : undefined,
                },
            },
          }
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: plugins
}
