require('dotenv').config();
const cssnano = require('cssnano')
const extend = require('extend')
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require(path.resolve(process.cwd(), './package.json'));

const debug = process.env.NODE_ENV === 'development';
const verbose = process.env.VERBOSE === 'true';
const hmr = process.env.HMR === 'true';

const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: hmr,
});

const AUTOPREFIXER_BROWSERS = [
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 34',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];
const exposevar = {
    'process': {
        'env': {
            'BROWSER': true,
            'WEB_HOST': JSON.stringify(process.env['WEB_HOST']),
            'WEB_PORT': JSON.stringify(process.env['WEB_PORT']),
            'API_HOST': JSON.stringify(process.env['API_HOST']),
            'API_PORT': JSON.stringify(process.env['API_PORT']),
            'IO_HOST': JSON.stringify(process.env['IO_HOST']),
            'IO_PORT': JSON.stringify(process.env['IO_PORT'])
        }
    }
}
console.log(`babel-loader?${JSON.stringify(babelConfig)}`)

let BASE_CSS_LOADER;
if (!debug)
 BASE_CSS_LOADER = 'css?-minimize'
else
BASE_CSS_LOADER = 'css?sourceMap&-minimize'

// Add any packge names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
]

// If config has CSS modules enabled, treat this project's styles as CSS modules.

  PATHS_TO_TREAT_AS_CSS_MODULES.push(
    process.cwd().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&') // eslint-disable-line
  )
const localIdentName= debug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]';
  const cssModulesLoader = [
    BASE_CSS_LOADER,
    'modules',
    'importLoaders=1',
    'localIdentName='+localIdentName
   // 'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')
const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)


const configvar={
      'process.env.NODE_ENV': debug ? '"development"' : '"production"',
      __DEV__: debug,
    }
// Webpack configuration (main.js => public/dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const webpackConfig = {
  plugins: [],
  context: process.cwd(),
    // Switch loaders to debug or release mode
  debug: debug,
  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: debug ? 'source-map' : false,

    resolve: {
    },
    cache: false,

  // Options affecting the normal modules
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(process.cwd(), './actions'),
          path.resolve(process.cwd(), './components'),
          path.resolve(process.cwd(), './core'),
          path.resolve(process.cwd(), './pages'),
          path.resolve(process.cwd(), './routes'),
          path.resolve(process.cwd(), ''),
          path.resolve(process.cwd(), './main.js'),
        ],
       loader: `babel-loader?${JSON.stringify(babelConfig)}`,
      },
      {
        test: /\.css/,
                  include: cssModulesRegex,
        loaders: [
          'simple-universal-style',
          cssModulesLoader,
          'postcss-loader',
        ],
      },
      {
        test: /\.json$/,
        exclude: [
          path.resolve(process.cwd(), './routes.json'),
        ],
        loader: 'json-loader',
      },
      {
        test: /\.json$/,
        include: [
          path.resolve(process.cwd(), './routes.json'),
        ],
        loaders: [
           `babel-loader?${JSON.stringify(babelConfig)}`,
          path.resolve(process.cwd(), './utils/routes-loader.js'),
        ],
      },
      {
        test: /\.md$/,
        loader: path.resolve(process.cwd(), './utils/markdown-loader.js'),
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
        {
            test: /\.woff(\?.*)?$/,
            loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.woff2(\?.*)?$/,
            loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
        },
        {test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'},
        {
            test: /\.ttf(\?.*)?$/,
            loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
        },
        {test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]'},
        {test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'},
      {
        test: /\.(wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },

  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  postcss(bundler) {
    return [
      // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
      // https://github.com/postcss/postcss-import
      require('postcss-import')({ addDependencyTo: bundler }),
      // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
      // https://github.com/postcss/postcss-custom-properties
      require('postcss-custom-properties')(),
      // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
      // https://github.com/postcss/postcss-custom-media
      require('postcss-custom-media')(),
      // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
      // https://github.com/postcss/postcss-media-minmax
      require('postcss-media-minmax')(),
      // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
      // https://github.com/postcss/postcss-custom-selectors
      require('postcss-custom-selectors')(),
      // W3C calc() function, e.g. div { height: calc(100px - 2em); }
      // https://github.com/postcss/postcss-calc
      require('postcss-calc')(),
      // Allows you to nest one style rule inside another
      // https://github.com/jonathantneal/postcss-nesting
      require('postcss-nesting')(),
      // W3C color() function, e.g. div { background: color(red alpha(90%)); }
      // https://github.com/postcss/postcss-color-function
      require('postcss-color-function')(),
      // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
      // https://github.com/iamvdo/pleeease-filters
      require('pleeease-filters')(),
      // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
      // https://github.com/robwierzbowski/node-pixrem
      require('pixrem')(),
      // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
      // https://github.com/postcss/postcss-selector-matches
      require('postcss-selector-matches')(),
      // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
      // https://github.com/postcss/postcss-selector-not
      require('postcss-selector-not')(),
      // Add vendor prefixes to CSS rules using values from caniuse.com
      // https://github.com/postcss/autoprefixer
      cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
    ];
  },

}


const clientConfig = extend(true, {}, webpackConfig, {

  // The entry point for the bundle
  entry: [
    /* The main entry point of your JavaScript application */
    './main.js',
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(process.cwd(), './public/dist'),
    publicPath: '/dist/',
    filename: debug ? '[name].js?[hash]' : '[name].[hash].js',
   // chunkFilename: debug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
    sourcePrefix: '  ',
  },

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: debug,
    hash: verbose,
    version: verbose,
    timings: true,
    chunks: verbose,
    chunkModules: verbose,
    cached: verbose,
    cachedAssets: verbose,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin(extend(true, {}, configvar, exposevar)),
    new CopyWebpackPlugin([{from: 'assets', to: ''}]),
    // Emit a JSON file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(process.cwd(), './public/dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ],

});

// Optimize the bundle in release (production) mode
if (!debug) {
  clientConfig.plugins.push(new webpack.optimize.DedupePlugin());
  clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: verbose,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }));
  clientConfig.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// Hot Module Replacement (HMR) + React Hot Reload
if (hmr) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  clientConfig.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientConfig.plugins.push(new webpack.NoErrorsPlugin());
}


exposevar.process.env.BROWSER = false;
const serverConfig = extend(true, {}, webpackConfig, {

    output: {
    path: path.resolve(process.cwd(), './public/dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        //path: path.resolve(__dirname, '../dist/assets')
    },
  entry: [
    /* The main entry point of your JavaScript application */
    './server.js',
  ],
    target: 'node',

    externals: [
        /^\.\/assets$/,
        /ajv/,
        function filter(context, request, cb) {
            const isExternal =
                request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) && !request.match(/^react-routing/) && !context.match(/[\\/]react-routing/);
            cb(null, Boolean(isExternal));
        },
    ],

    plugins: [
    new webpack.ProvidePlugin({
            "React": "react"
        }),
        //  new HappyPack({ id: 'js' }),
        //  new HappyPack({ id: 'css' }),
        // Define free variables
        // https://webpack.github.io/docs/list-of-plugins.html#defineplugin

        new webpack.DefinePlugin(extend(true, {}, configvar, exposevar)),
    ],

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },

});

module.exports = [clientConfig, serverConfig];

