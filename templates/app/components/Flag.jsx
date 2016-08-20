import IconButton from 'material-ui/FlatButton';
import history from '../core/history';
import {
  Icon_Flag_FR,Icon_Flag_RU,Icon_Flag_US,Icon_Flag_UK,Icon_Flag_BR
} from 'material-ui-country-flags';
var _ = require('lodash');

const Sel_Flag = ({FL,ky,component}={FL,ky,component}) => {
let path;
if (FL=='FR'){
 _.map(window.__routesfr__,(val,y)=> {
if (val.component==component){
path=val.path;
}
});
return <IconButton href={"http://"+process.env['SITEFR']+history.createHref(path)} key={ky}><Icon_Flag_FR /></IconButton>;
}else if (FL=='RU'){
_.map(window.__routesru__,(val,y)=> {
if (val.component==component){
path=val.path;
return;
}
});
return <IconButton href={"http://"+process.env['SITERU']+history.createHref(path)} key={ky}><Icon_Flag_RU /></IconButton>;
}else if (FL=='PT'){
_.map(window.__routespt__,(val,y)=> {
if (val.component==component){
path=val.path;
return;
}
});
return <IconButton href={"http://"+process.env['SITEPT']+history.createHref(path)} key={ky}><Icon_Flag_BR /></IconButton>;
}else if (FL=='UK'){
_.map(window.__routesuk__,(val,y)=> {
if (val.component==component){
path=val.path;
return;
}
});
return <IconButton href={"http://"+process.env['SITEUK']+history.createHref(path)} key={ky}><Icon_Flag_UK /></IconButton>;
}else{
_.map(window.__routesen__,(val,y)=> {
if (val.component==component){
path=val.path;
return;
}
});
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
 other= ['PT','US','UK','FR','RU'];;
 }else {
 other= ['US','PT','UK','FR','RU'];;
 }

 //findcomponent
let component;
 _.map(window.__routes__,(val,key)=> {
if (val.path==path){
component=val.component;
}
});
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
