const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "public",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{ loader: "css-loader", options: { minimize: true } }]
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    stats: "errors-only",
    overlay: {
      errors: true,
      warnings: true
    }
  },
  plugins: [new ExtractTextPlugin("app.css")]
}
