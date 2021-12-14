const path = require('path')

const copy = require("copy-webpack-plugin");
const extract = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const copy_files = [
  "README.md"
];

const plugins = [
  new copy({ patterns: copy_files }),
  new extract({filename: "[name].css"})
];

/* A standard nodejs and webpack pattern */
const production = process.env.NODE_ENV === 'production';

/* Only minimize when in production mode */
if (production) {
  plugins.unshift(new CompressionPlugin({
      test: /\.(js|jsx|html|css)$/,
      deleteOriginalAssets: true
  }));
}

module.exports = {
  mode: production ? 'production' : 'development',
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    index: "./src/index.js",
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },

  optimization: {
    minimize: production,
    minimizer: [
        new TerserJSPlugin({
            extractComments: {
                condition: true,
                filename: `[file].LICENSE.txt?query=[query]&filebase=[base]`,
                banner(licenseFile) {
                    return `License information can be found in ${licenseFile}`;
                },
            },
        }),
        new CssMinimizerPlugin()
    ],
  },

  module: {
    rules: [
     {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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
  plugins: plugins
}
