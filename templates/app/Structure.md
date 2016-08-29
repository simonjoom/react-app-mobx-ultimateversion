# React App Starter Kit

This project was created with **[React App SDK](https://github.com/kriasoft/react-app)**  
— CLI tools and templates for authoring React/Mobx applications with just a single dev dependency and
zero configuration.

## Debugging: 
New All components are in debugging mode with current state tree displayed at the footer page


### READ and LEARN react-app router:
[app/routes_fr.json#L12-L14](https://github.com/simonjoom/react-app-ssr/blob/master/templates/app/routes_fr.json#L12-L14)  
->> This functionnality is very interesting to use  

[core/router.js#L59-L71](https://github.com/simonjoom/react-app-ssr/blob/master/templates/app/core/router.js#L59-L71)  
THe router fetch the get and store the result in prop Article before to render the component (Promise)  

[Skiscool/Skiscool.js#L109-L111](https://github.com/simonjoom/react-app-ssr/blob/master/templates/app/routes/Skiscool/Skiscool.js#L109-L111)   

We can use it to get some stuff from feathers-database to display in frontend;



## Create components rules: 
### Create first rules for routes langue correspondance
in routes.json  
in routes_fr.json  
in routes_pt.json  

ex: in routes_fr.json  
>       {
        "path": "/my_routefr",
        "component": "./routes/Mycomp"
        },

### Create component entry point for routes in:

>* See and take exemple of:   
    here: -/routes/Skiscool for React component formating  
    or -/routes/Contact  for Stateless format
    
>* Create component rule:  
        /routes/Mycomp/index.js : export default from "./Mycomp";  
        /routes/Mycomp/Mycomp.js  
        /routes/Mycomp/Mycomp.css

> better to link appstate with mobx (observer) only in routes entry point not in components (and we pass value through props)  
> /routes/Mycomp/Mycomp.js:                  
                
                import Layout from '../../components/Layout';  
                import Mycomp from '../../components/Mycomp'; //see at bottom   
                 ...  
                @observer(['appstate'])  
                class Mycomp extends React.Component {  
                
 Mycomp.js render in this format:    

>       <Layout className={s.content} bp={bp} comp={"Mycomp"} title={"Mycomp title"} subtitle={"It's my awesome component Mycomp rendered subtitle"}>
           <Mycomp bp={bp} lang={lang} otherstateprop={appstate.otherstateprop}/> #pass breakpoint-state and lang to component and other props
           </Layout>

### Create stateless component
Mycomp is stateless component (preference) because with mobx no need to use state   
For "Mycomp" name:  
create a folder in   
>         /components  
          ├── /Mycomp/                     Static files such as favicon.ico etc.
          │   ├── package.json             The folder entry point 
            {
             "name": "Mycomp",
             "version": "0.0.0",
            "private": true,
            "main": "./Mycomp.jsx"
             }
          │   ├── Mycomp.jsx              Component .jsx 
          │   ├── Mycomp.css              style for Mycomp
 
### Style defined:
    ~/temp/styles/_.material.js     override material-ui styles
    
### Pictures: 
>To add picture just add it in folder "assets"  
the path to use is '/dist/mypictureaddedinasset.jpg'  
You need to reload 'npm start' if yu added when app started  
Webpack put all in '/dist/' folder in memory


# Directory Layout

```shell
.
├── /bin/                       # Folder to run server api (tools)
├── /components/                # Shared or generic UI components 
│   ├── /App/                   # Entry Point components major nodes defined here with framework basecss+bootstrap
│   ├── /Navigation/            # Main menu component at the really tio
│   ├── /Header/                # Sidebar component (i could to name it sidebar instead maybe...
│   ├── /Layout/                # Website layout or template component with header/body/ and footer it's used in each router component.. 
                                #so you can add here some stuff for each pages  
                                
    ├──  Linkmaterial.js             # used for each link to a page of the website using material-ui effect !! important
    
    
│   ├── /Link/                  # Link component to be used insted of <a>
│   ├── /forms/                 # We use mobx-ajv-form for form checking
│   ├── /Profile/               # Profile component when user logged (info email status...)
│   ├── /Skiscool/              # Skiscool component maybe futur home page
│   └── /...                    # etc.


├── /core/                      # Core framework
│   ├── /history.js             # Handles client-side navigation
│   ├── /router.js              # Handles routing and data fetching
│   └── /dispatch.js            # Used by component to trigger mobx action from store
│   └── /decorators/            # Used by store , extend extend class in store, toggle assign a boolean state to a variable in store (to toggle material-ui theme)


├── /node_modules/              # 3rd-party libraries and utilities
├── /styles/                    # All styles for application

├── /store/                     # Store MOBX / define here all observer and action directly in store.
│   ├── /stores.js              # Load store stores/ui stores/auth stores/post
│   ├── /ui                     # Load store ui 

├── /routes/                    # React components for application routes
│   ├── /Error/                 # Error page
│   ├── /Skiscool/              # Home page
│   ├── /GetStarted/            # Getting Started page
│   └── /...                    # etc.
├── /public/                    # Static files such as favicon.ico etc.
│   ├── /dist/                  # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── /...                    # etc.
├── /test/                      # Unit and integration tests
├── /assets/                    # Assets pictures...etc Webpack will copy from this folder to public/dist in memory
├── /utils/                     # Utility and helper classes

│── index.ejs                   # EJS template for index.html page

│── main.js                     # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
└── routes.json                 # This list of application routes
```


### How to Run
After running server_API + nginx  
In order to compile the app and launch a development web server with "live reload" run:

```sh
$ npm start
```

The app should become available at [http://fr.skiscool.com](http://fr.skiscool.com)

### Common Tasks

- In order to modify the layout of your site, edit `components/Layout` React component
- To add custom fonts, page metadata edit `index.ejs` file in the root of your project
- To add a new page/screen add a new entry to the `routes.json` file with routing information, plus
  add a React component inside the `routes` folder that will be responsible for rendering that route
- Need to create small, reusable component (e.g. Button, Slider)? Put that it into the `components`
  folder.
- Style your components with either CSS or inline styles. This project is pre-configured with CSS
  Modules as well as PostCSS with a nice set of useful plugins (no need to use Sass or LESS).
- Use `core/history.js` file for navigation, learn more about it [here](https://github.com/ReactTraining/history/tree/master/docs)
- Learn how to effectively use [Browsersync](https://browsersync.io/), it will help with
  cross-device testing.


### Support

Have any questions, issues or feature requests, please don't hesitate to get in touch on
[Gitter](https://gitter.im/kriasoft/react-app) or [Twitter](https://twitter.com/ReactSDK).
