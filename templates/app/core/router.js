import Layout from '../components/Layout';
function decodeParam(val) {
  if (!(typeof val === 'string' || val.length === 0)) {
    return val;
  }

  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = `Failed to decode param '${val}'`;
      err.status = 400;
    }

    throw err;
  }
}

// Match the provided URL path pattern to an actual URI string. For example:
//   matchURI({ path: '/posts/:id' }, '/dummy') => null
//   matchURI({ path: '/posts/:id' }, '/posts/123') => { id: 123 }
function matchURI(route, path) {
  const match = route.pattern.exec(path);

  if (!match) {
    return null;
  }

  const params = Object.create(null);

  for (let i = 1; i < match.length; i++) {
    params[route.keys[i - 1].name] = match[i] !== undefined ? decodeParam(match[i]) : undefined;
  }

  return params;
}

// Find the route matching the specified location (context), fetch the required data,
// instantiate and return a React component
function resolve(routes, context) {

  const path = decodeURI(context.pathname);
  for (const route of routes) {
    const params = matchURI(route, context.error ? '/error' : path);
    let myprops = {};
    let MAPPING=[];
    let keys=[];
    if (route.lang) {
      myprops.lang = route.lang;
    }
    if (route.description) {
      myprops.description = route.description;
    }
    if (route.title) {
      myprops.title = route.title;
    }
    if (route.h1) {
      myprops.h1 = route.h1;
    }else{
    myprops.h1 ="";
    }

    if (route.h2) {
      myprops.h2 = route.h2;
    }else{
    myprops.h2 ="";
    }
    if (params) {
      // Check if the route has any data requirements, for example:
      //
      //   {
      //     path: '/tasks/:id',
      //     data: { task: 'GET /api/tasks/$id' },
  /*  "data": {
      "articles": "GET https://gist.githubusercontent.com/koistya/a32919e847531320675764e7308b796a/raw/articles.json",
      "googleP": "GET http://picasaweb.google.com/data/entry/api/user/104140211971665971268?alt=json"
    }*/
      //     component: './routes/TaskDetails'
      //   }
      //
      if (route.data) {
        // Load route component and all required data in parallel
        keys = Object.keys(route.data);
        //return Promise.all([
         // route.load(),
         MAPPING= keys.map(key => {
            const query = route.data[key];
            const method = query.substring(0, query.indexOf(' ')); // GET
            const url = query.substr(query.indexOf(' ') + 1);      // /api/tasks/$id
            // TODO: Replace query parameters with actual values coming from `params`
            return fetch(url, { method }).then(resp => resp.json());
          });
      }
       return Promise.all([
          route.load(),
          route.loadmd(route.lang,route.mdfile),
          ...MAPPING
           ]).then(
          ([Component, data,...datamap]) => {
          console.log(data);
          let props;
          if (keys)
          props = keys.reduce((result, key, i) => ({ ...result, [key]: datamap[i] }), {});
          else
          props = {};
				const comp= route.component.replace('./routes/', '');
            return (
            <Layout
        comp={comp}
        title={myprops.h1}
        subtitle={myprops.h2}
      >
            <Component
              route={route}
              error={context.error}
              {...data}
              {...props}
              {...myprops}
            />
            </Layout>
            );
            })
    }
}  const error = new Error('Page not found');
  error.status = 404;
  return Promise.reject(error);
}

export default { resolve };
