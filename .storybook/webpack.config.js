const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async ({ config }) => {
  config.module.rules.reduce((rules, rule) => {
    if (rule.test === /\.css$/) {
      return Object.assign({
          use: Array.prototype.concat([
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            }
          ], rule.use)
      }, rule)
    }
    return rule
  }, [])
  const rules = Array.prototype.concat(config.module.rules, [{
    test: /\.(html|svelte)$/,
    exclude: /node_modules/,
    use: {
      loader: 'svelte-loader',
      options: {
        emitCss: true,
      },
    },
  }]);
  const cssExtractPlugin = [new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  })];
  const plugins = config.plugins
    ? Array.prototype.concat(config.plugins, cssExtractPlugin)
    : cssExtractPlugin

  return config.resolve.mainFields
    ? Object.assign(
      {
        resolve: {
          mainFields: Array.prototype.concat(
            config.resolve.mainFields,
            ['svelte']
          )
        },
        module:{rules},
        plugins
      },
      config
    )
    : Object.assign(
      {
        resolve:{
          mainFields: ['svelte']
        },
        module:{rules},
        plugins
      },
      config
    );
}
