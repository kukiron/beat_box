const path = require("path")

module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build",
    filename: "bundle.js"
  },
  devtool: "source-map",
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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1, minimize: true }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "public/",
    stats: "errors-only",
    overlay: {
      errors: true,
      warnings: true
    }
  }
}
