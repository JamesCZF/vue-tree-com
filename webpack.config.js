const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  //入口文件，就是上步骤的src目录下的index.js文件，
  entry: "./src/index.js",
  output: {
    //输出路径，就是上步骤中新建的dist目录，
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "ctree.min.js",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      "@img": path.resolve(__dirname, "src/assets/images/")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
        loader: "url-loader",
        options: {
          limit: 30000,
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ]
};
