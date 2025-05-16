const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');

// Dynamically discover all extension files in the src directory
const getExtensionEntries = () => {
  const entries = {};
  
  // Always include the main index file
  entries['surveyjs-extensions'] = './src/index.ts';
  
  // Find all TypeScript files that aren't index.ts or type definitions
  const srcDir = path.resolve(__dirname, 'src');
  const files = fs.readdirSync(srcDir);
  
  files.forEach(file => {
    if (file.endsWith('.ts') && file !== 'index.ts' && !file.endsWith('.d.ts')) {
      // Use the filename without extension as the entry name
      const name = file.replace('.ts', '');
      entries[name] = `./src/${file}`;
    }
  });
  
  return entries;
};

module.exports = {
  mode: 'production',
  entry: getExtensionEntries(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
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
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: {
    'survey-core': 'Survey',
    'survey-creator-core': 'SurveyCreator'
  }
}; 