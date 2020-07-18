const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "client", "index"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js"]
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
