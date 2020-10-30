const CracoAlias = require('craco-alias');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: path.resolve(__dirname, 'tsconfig.paths.json'),
      },
    },
  ],
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === 'development' ? [new BundleAnalyzerPlugin({ openAnalyzer: false })] : []),
    ],
  },
  babel: {
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/core',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'core',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'icons',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/lab',
          libraryDirectory: 'esm',
          camel2DashComponentName: false,
        },
        'lab',
      ],
    ],
  },
};
