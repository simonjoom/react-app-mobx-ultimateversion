const toRegExp = require('path-to-regexp');
const fs = require('fs');
require('babel-runtime/core-js/promise').default = require('bluebird');

function escape(text) {
  return text.replace('\'', '\\\'').replace('\\', '\\\\');
}

 const promisifiedopen = Promise.promisify(fs.open);

/**
 * Converts application routes from JSON to JavaScript. For example, a route like
 *
 *   {
 *     "path": "/about",
 *     "component": "./routes/About"
 *   }
 *
 * becomes
 *
 *   {
 *     path: '/about',
 *     pattern: /^\\/about(?:\/(?=$))?$/i,
 *     keys: [],
 *     component: './routes/About',
 *     load: function () { return new Promise(resolve => require(['./routes/About'], resolve)); }
 *   }
 */

module.exports = function routesLoader(source) {
  this.cacheable();
 const callback = this.async();
console.log(callback);

      const Myrequiremd = (module,name) => `new Promise(function (resolve, reject) {
        try {
          require.ensure(['${escape(module)}'], function (require) {
            resolve(require('${escape(module)}'));
          },'${escape(name)}')
        } catch (err) {
          reject(err);
        }
      })`;

  let outputP=[];
  const routes = JSON.parse(source);

           // callback(null, `module.exports = test`);
           // return;
routes.forEach(function (route, i) {
 // for (const route of routes) {
  //let mdfile_r=route.mdfile;
  let mdfile_r=false;
    const keys = [];
    const pattern = toRegExp(route.path, keys);
 		const Myrequire = route.chunk && route.chunk !== 'main' ?
      module => `new Promise(function (resolve, reject) {
        try {
          require.ensure(['${escape(module)}'], function (require) {
            resolve(require('${escape(module)}').default);
          }${typeof route.chunk === 'string' ? `, '${escape(route.chunk)}'` : ''});
        } catch (err) {
          reject(err);
        }
      })`:
      module => `Promise.resolve(require('${escape(module)}').default)`;


        if (!mdfile_r)
            mdfile_r = route.component.replace('./routes/', '');
        mdfile_r = mdfile_r + '_' + route.lang + '.md';

        let appRoot = process.cwd(),
            path = route.component.replace('./', '/');

        console.info(appRoot + path + '/' + mdfile_r);
        let myout = promisifiedopen(appRoot + path + '/' + mdfile_r, 'r').then(function(fullfill) {
            console.log(fullfill + ' filled')
           return Promise.resolve(`${Myrequiremd(route.component+'/'+mdfile_r,route.lang)}`);
        }, function(reject) {
            console.log(mdfile_r + ' rejeted');
            return Promise.resolve(`Promise.resolve({html:'file ${escape(mdfile_r)} not found'})`);
            // output.push(` return {html:'file ${escape(mdfile_r)} not found'}; \n`)
        }).then(function(res) {
            let out = [];
            out.push('  {\n');
            out.push(`    path: '${escape(route.path)}',\n`);
            out.push(`    pattern: ${pattern.toString()},\n`);
            out.push(`    keys: ${JSON.stringify(keys)},\n`);
            out.push(`    component: '${escape(route.component)}',\n`);
            if (route.data) {
                out.push(`    data: ${JSON.stringify(route.data)},\n`);
            }

            if (route.description) {
                out.push(`    description: ${JSON.stringify(route.description)},\n`);
            }
            if (route.title) {
                out.push(`    title: ${JSON.stringify(route.title)},\n`);
            }
            if (route.lang) {
                out.push(`    lang: ${JSON.stringify(route.lang)},\n`);
            }
            out.push(`    load() {\n      return ${Myrequire(route.component)};\n    },\n`);

            out.push(`    loadmd(lang,mdfile) { \n`);
            out.push(` 		return ${res}  \n`);
            out.push(`    },\n`);
            out.push('    },\n');
            return out;
        });
        outputP.push(myout);
    });
let isend=false;
  const outputfinal = ['[\n'];
        Promise.all(outputP).then((values) => {
            values.forEach(function(value, i) {
                value.forEach(function(val, i) {
                    outputfinal.push(val);
                });
            });

            return outputfinal;
        }, function(oo) {
        callback(o);
        }).then((output) => {
            output.push(']');
            isend=true;
            let result=output.join('');
            callback(null, `module.exports = ${result}`);
            //return output.join('');
        });

}
