import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..', 'src'),
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/',
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './main.js',
  ],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        DEV_TOOLS: true,
        NODE_ENV: 'local',
      }),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
    root: [
      path.resolve('./src'),
    ],
    fallback: path.join(__dirname, 'node_modules'),
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      { test: /\.(woff2?|svg|png|jpg|gif)/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)/, loader: 'file' },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-1'],
          plugins: [['transform-decorators-legacy'], ['transform-object-rest-spread'], ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module'],
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react'],
            }],
          }]],
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: path.resolve(__dirname, '..', 'node_modules', 'react-toaster'),
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass?sourceMap',
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].html',
        include: path.resolve(__dirname, '..', 'src', 'content'),
      },
    ],
  },
  eslint: {
    emitWarning: true,
    emitError: true,
    failOnError: false,
  },
};
