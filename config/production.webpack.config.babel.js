import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..', 'src'),
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name][chunkhash].js',
    publicPath: '/dist',
  },
  entry: {
    bundle: './main.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: 'src/content/index.prd.html',
      filename: '../index.html',
      inject: true,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
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
  eslint: false,
  postcss: function postcss() {
    return [autoprefixer, precss];
  },
};
