const bodyParser = require('body-parser')
const feathers = require('feathers')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const authentication = require('feathers-authentication')
const memoryService = require('feathers-memory')

const app = feathers()
        .configure(rest())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({extended: true}))
        .configure(hooks())
        .configure(authentication({
          idField: 'id',
          session: true
        }))
        .use(feathers.static(__dirname + '/public'))
        .get('/hello', function(req, res) {
          console.log("/hello",
              '\n  req.feathers:', req.feathers,
              '\n  req.params:', req.params,
              '\n  req.user:', req.user)
          res.send(req.isAuthenticated() ? 'authenticated' : 'NOT authenticated')
        })

app.listen(3000, () => {
    console.log(`The server is running at http://localhost:3000/`);
});
console.log('serverruning');
