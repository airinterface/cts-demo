const webpack = require('webpack');
const path    = require('path');
const dotenv  = require('dotenv');
dotenv.config({path:__dirname+'/.env'});
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const root_path = path.resolve(__dirname, '..');

const MAPBOX_KEY    = process.env.MAPBOX_KEY;
const MAPBOX_STYLE  = process.env.MAPBOX_STYLE;
const MAPBOX_TILE_URL      = process.env.MAPBOX_TILE_URL;
const MAPBOX_GEOJSON_URL   = process.env.MAPBOX_GEOJSON_URL;

module.exports = {
  entry: {
    'app': './src/main.js'
  },
  output: {
    publicPath: "/dist",
    filename: 'javascripts/[name].js',
    path: path.resolve(root_path, 'dist/assets')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(root_path, 'components'), 'node_modules']
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },

  module: {
    rules: [
      { test: /.tsx?$/, loader: 'ts-loader',
        options: { allowTsInNodeModules: true }
      },
      { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath:  path.resolve(root_path, 'dist/assets/css')
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true,
            },
          },
        ],
      }

    ]
     
  },
  watchOptions: {
    ignored: ['node_modules']
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(root_path, 'dist'),
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MAPBOX_KEY': JSON.stringify( MAPBOX_KEY ),
      'process.env.MAPBOX_STYLE': JSON.stringify( MAPBOX_STYLE ),
      'process.env.MAPBOX_TILE_URL': JSON.stringify( MAPBOX_TILE_URL ),
      'process.env.MAPBOX_GEOJSON_URL': JSON.stringify( MAPBOX_GEOJSON_URL )
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: path.join( 'css','[name].css'),
      chunkFilename: '[id].css',
      path: path.resolve( 'assets')
    })
  ]
}