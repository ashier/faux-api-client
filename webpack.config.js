module.exports = {
  entry: './src/fauxApiClient.ts',
  mode: 'production',
  target: 'node',
  optimization: {
      namedModules: true,
      namedChunks: true,
      minimize: false,
  },
  resolve: {
      extensions: ['.js', '.jsx']
  },
  output: {
      libraryTarget: 'commonjs',
      path: path.join(__dirname, '.webpack'),
      filename: '[name].js'
  }
}