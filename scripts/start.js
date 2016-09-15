import runServer from './runServer';
const fs = require('fs');
const ejs = require('ejs');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')


module.exports = config => {
  let count = 0;
  return new Promise(resolve => {
    const bs = require('browser-sync').create();
    const compiler = webpack(config.webpack);
    const middlewarecross = function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    }

    if (!process.env.template) {
      const webpackMiddl = webpackDevMiddleware(compiler, {
        publicPath: config.webpack.output.publicPath,
        stats: config.webpack.stats,
      });
      compiler.plugin('done', stats => {
        // Generate index.html page
        const bundle = stats.compilation.chunks.find(x => x.name === 'main').files[0];
        const template = fs.readFileSync('./index.ejs', 'utf8');
        const render = ejs.compile(template, {
          filename: './index.ejs'
        });
        const output = render({
          debug: process.env.NODE_ENV === 'development',
          bundle: `/dist/${bundle}`,
          config: config.webpack
        });
        fs.writeFileSync('./public/index.html', output, 'utf8');

        // Launch Browsersync after the initial bundling is complete
        // For more information visit https://browsersync.io/docs/options
        if (++count === 1) {
          bs.init({
            // host: "fr.skiscool.com",
            // port: process.env.PORT || 3000,
            // ui: { port: Number(process.env.PORT || 3000) + 1 },
            // server: {
            //   baseDir: 'public',
            proxy: {
              target: 'localhost:3000',
              ws: true,
              middleware: [
                webpackMiddl,
                require('webpack-hot-middleware')(compiler),
                require('connect-history-api-fallback')(),
              ],
            },
            snippetOptions: {
              ignorePaths: ['tiles/**'],
            }
          }, resolve);
        }
      });
    } else {
      // Node.js middleware that compiles application in watch mode with HMR support
      // http://webpack.github.io/docs/webpack-dev-middleware.html
      const publicPath = config.webpack[0].output.publicPath
      const webpackMiddl = webpackMiddleware(compiler, {
        publicPath: publicPath,
        stats: config.webpack[0].stats,
      });
      compiler.plugin('done', stats => {
        const bundle = stats.stats[0].compilation.chunks.find(x => x.name === 'main').files[0];
        const bundleserver = stats.stats[1].compilation.chunks.find(x => x.name === 'main').files[0];
        console.log(bundle)

        // Launch Browsersync after the initial bundling is complete
        // For more information visit https://browsersync.io/docs/options
        if (++count === 1) {
          const startbs = (err) => {
            if (!err) {
              bs.init({
                proxy: {
                  target: 'localhost:3000',
                  // baseDir: 'public',
                  middleware: [
                    middlewarecross,
                    webpackMiddl,
                    require('webpack-hot-middleware')(compiler),
                    //require('connect-history-api-fallback')(),
                  ],
                },
                snippetOptions: {
                  ignorePaths: ['tiles/**'],
                },
                files: ['public/dist/*.*']
              }, resolve);
              //todo browser-sync
            }
          };
          runServer(startbs);
        }

      });

    }
  });
};
