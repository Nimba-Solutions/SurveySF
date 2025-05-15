const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'surveyjs-extensions.js',
    library: 'SurveyJSExtensions',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'survey-core': {
      root: 'Survey',
      commonjs: 'survey-core',
      commonjs2: 'survey-core',
      amd: 'survey-core'
    },
    'survey-creator-core': {
      root: 'SurveyCreator',
      commonjs: 'survey-creator-core',
      commonjs2: 'survey-creator-core',
      amd: 'survey-creator-core'
    }
  }
}; 