const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async ({ config }) => {
  // console.dir(, { depth: null })
  // console.dir(config.module.rules, { depth: null })
  // config.module.rules.filter(rule => )
  config.module.rules.reduce((rules, rule) => {
    if (rule.test === /\.css$/) {
      return Object.assign({
          use: Array.prototype.concat([
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                // publicPath: '../',
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
  }/*, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    }),
  }*/]);
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
  // .resolve.mainFields = Array.assign({}, config.resolve.mainFields)
  // return console.dir(config, { depth: null }) || config;
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

// Export a function. Accept the base config as the only param.
// module.exports = async ({ config, mode }) => {
//   const svelteLoader = config.module.rules.find(r => r.loader && r.loader.includes('svelte-loader'));
//   svelteLoader.options = {
//     preprocess: {
//       style: (...args)=>{
//         console.log(args)
//       }
//     }
//   };
// }
