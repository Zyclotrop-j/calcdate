const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "datecalculator.js",
    libraryTarget: "umd",
    globalObject: "this",
    // libraryExport: 'default',
    library: "datecalculator"
  },
  externals: {
    luxon: {
      commonjs: "luxon",
      commonjs2: "luxon",
      amd: "luxon",
      root: "luxon"
    },
    "date-fns": {
      commonjs: "date-fns",
      commonjs2: "date-fns",
      amd: "date-fns",
      root: "datefns"
    },
    moment: {
      commonjs: "moment",
      commonjs2: "moment",
      amd: "moment",
      root: "moment"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: "babel-loader"
      }
    ]
  }
};
