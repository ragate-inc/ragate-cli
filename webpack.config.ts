import * as webpack from 'webpack';
import * as path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  entry: './lib/app.ts',
  mode: process.env.ENV as 'production' | 'development',
  target: 'node',
  output: {
    filename: 'app.js',
    path: path.resolve(process.cwd() + '/bin'),
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  } as webpack.ModuleOptions,
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
  resolve: {
    extensions: ['.cjs', '.mjs', '.js', '.ts', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
  externals: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    nodeExternals({
      modulesDir: path.resolve(__dirname, './node_modules'),
      allowlist: ['pino-pretty'],
    }),
  ],
};

export default config;
