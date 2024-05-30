const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function setupDevtool(IS_DEV) {
  if (IS_DEV) {
    return "source-map";
  }

  return false;
}

const PLUGINS = [
  new CleanWebpackPlugin(),
  new CopyPlugin({
    patterns: [
      { from: "markup", to: "" },
      { context: "src/", from: "*.html", to: "[name][ext]" },
      { context: "src/", from: "**/*.html", to: "html/[path][name][ext]" },
    ],
  }),
];

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === "development";
  const IS_PROD = argv.mode === "production";

  return {
    target: "web",
    mode: argv.mode,
    entry: "./src/index.ts",
    output: {
      path: path.join(__dirname, "public"),
      publicPath: "/",
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          use: ["ts-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
          ],
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader",
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    devtool: setupDevtool(IS_DEV),
    plugins: PLUGINS,
    devServer: {
      open: true,
      host: "localhost",
    },
  };
};
