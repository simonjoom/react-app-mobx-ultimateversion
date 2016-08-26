import IconButton from 'material-ui/FlatButton';
import history from '../core/history';
import {
  Icon_Flag_FR,Icon_Flag_RU,Icon_Flag_US,Icon_Flag_UK,Icon_Flag_BR
} from 'material-ui-country-flags';
import _ from 'lodash';

const findroute_thendebug= (component,routes,lang) => {
let tmp=routes.find(x=>(x.component?x.component=== component:null));
if (tmp&&tmp.path){
return tmp.path;
}else{
console.log('link fail_:'+lang)
console.log(component)
return '/';
}
}

const findcomponent_thendebug= (path,routes) => {
let tmp=routes.find(x=>(x.path?x.path=== path:null));
if (tmp&&tmp.component){
return tmp.component;
}else{
console.log('link path_fail_:')
console.log(path)
return './routes/Skiscool';
}
}

const Sel_Flag = ({FL,ky,component}={FL,ky,component}) => {
let path;
if (FL=='FR'){
path=findroute_thendebug(component,window.__routesfr__,'fr')
return <IconButton href={"http://"+process.env['SITEFR']+history.createHref(path)} key={ky}><Icon_Flag_FR /></IconButton>;
}else if (FL=='RU'){
path=findroute_thendebug(component,window.__routesru__,'ru')
return <IconButton href={"http://"+process.env['SITERU']+history.createHref(path)} key={ky}><Icon_Flag_RU /></IconButton>;
}else if (FL=='PT'){
path=findroute_thendebug(component,window.__routespt__,'pt')
return <IconButton href={"http://"+process.env['SITEPT']+history.createHref(path)} key={ky}><Icon_Flag_BR /></IconButton>;
}else if (FL=='UK'){
path=findroute_thendebug(component,window.__routesuk__,'uk')
return <IconButton href={"http://"+process.env['SITEUK']+history.createHref(path)} key={ky}><Icon_Flag_UK /></IconButton>;
}else{
path=findroute_thendebug(component,window.__routesen__,'en')
return <IconButton href={"http://"+process.env['SITEEN']+history.createHref(path)} key={ky}><Icon_Flag_US /></IconButton>;
}
}

const Flag = () => {
let path=window.location.pathname;
let data=window.location.hostname;
let other= ['FR','UK','PT','RU'];

 if (data==process.env['SITEFR']){
 other= ['FR','US','UK','PT','RU']
 }else if (data==process.env['SITEUK']){
 other= ['UK','US','FR','PT','RU'];
 }else if (data==process.env['SITERU']){
 other= ['RU','US','UK','PT','FR'];
 }else if (data==process.env['SITEPT']){
 other= ['PT','US','UK','FR','RU'];
 }else {
 other= ['US','PT','UK','FR','RU'];
 }

 //findcomponent
let component=findcomponent_thendebug(path,window.__routes__)

var itemlist=[];
  _.map(other,(val,key)=> {
itemlist.push(<Sel_Flag FL={val} ky={key} key={key} component={component} />);
});


return (
      <div>
        {itemlist}
      </div>
    )

    };

export default Flag;
