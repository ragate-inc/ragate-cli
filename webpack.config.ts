import * as webpack from "webpack";
import * as path from "path";

const config: webpack.Configuration = {
  entry: "./lib/app.ts",
  mode: "production",
  output: {
    filename: "app.js",
    path: path.resolve(process.cwd() + "/bin"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  } as webpack.ModuleOptions,
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
};

export default config;
