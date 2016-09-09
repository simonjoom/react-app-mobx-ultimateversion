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

      const Myrequiremd = (module,name,def) => `new Promise(function (resolve, reject) {
        try {
          require.ensure(['${escape(module)}'], ()=> {
          if ('${escape(def)}'=='default'){
            resolve(require('${escape(module)}').default);
            }
            else{
            resolve(require('${escape(module)}'));
            }
          },'${escape(name)}')
        } catch (err) {
        console.log(err)
          reject(err);
        }
      })`;

  let outputP=[];
  const routes = JSON.parse(source);

routes.forEach(function (route, i) {
  let mdfile_r=false;let entrypoint=false;
    const keys = [];
    const pattern = toRegExp(route.path, keys);
 		const Myrequiredef = module => `Promise.resolve(require('${escape(module)}').default)`;
 		const Myrequire = module => `Promise.resolve(require('${escape(module)}'))`;

        if (!mdfile_r)
				mdfile_r = route.component.replace('./routes/', '');

        let mdfile = mdfile_r + '_' + route.lang + '.md';

if (route.entrypoint)
mdfile_r=route.entrypoint;

        let appRoot = process.cwd(),
            path = route.component.replace('./', '/');

        let myout = promisifiedopen(appRoot + path + '/' + mdfile, 'r').then(function(fullfill) {
            console.log(mdfile + ' filled')
            if (process.env.NODE_ENV=="development")
           return Promise.resolve(`${Myrequire(route.component+'/'+mdfile)}`);
            else
           return Promise.resolve(`${Myrequiremd(route.component+'/'+mdfile,route.lang,'')}`);
        }, function(reject) {

        return promisifiedopen(appRoot + path + '/' + mdfile_r + '_en.md', 'r').then(function(fullfill) {
            console.log(mdfile + ' rejected so' + mdfile_r + '_en filled')
            if (process.env.NODE_ENV=="development")
           return Promise.resolve(`${Myrequire(route.component+'/'+ mdfile_r + '_en.md')}`);
            else
           return Promise.resolve(`${Myrequiremd(route.component+'/'+ mdfile_r + '_en.md',route.lang,'')}`);
        }, function(reject) {
        return Promise.resolve(`Promise.resolve({html:'file ${escape(mdfile_r)} not found'})`);
        });

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
            if (route.h1) {
                out.push(`    h1: ${JSON.stringify(route.h1)},\n`);
            }else{
                out.push(`    h1: ${JSON.stringify(route.title)},\n`);
            }
            if (route.h1) {
                out.push(`    h2: ${JSON.stringify(route.h2)},\n`);
            }else{
                out.push(`    h2: ${JSON.stringify('')},\n`);
            }

            if (route.lang) {
                out.push(`    lang: ${JSON.stringify(route.lang)},\n`);
            }
             if(route.chunk&&(process.env.NODE_ENV!=="development"))
           out.push(`    load() {\n      return ${Myrequiremd(route.component+'/'+mdfile_r,route.chunk,'default')};\n    },\n`);
           else
            out.push(`    load() {\n      return ${Myrequiredef(route.component+'/'+mdfile_r)};\n    },\n`);

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
