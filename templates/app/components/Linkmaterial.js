import { Component, PropTypes } from 'react';
import history from '../core/history';
import FlatButton from 'material-ui/FlatButton';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
const padding_def="5";
const margin_def="0";


class Link extends Component { // eslint-disable-line react/prefer-stateless-function
constructor(props) {
        super(props);
this.toward="/";
this.tmp=window.__routes__.find(x=>(x.component?x.component=== "./routes/"+this.props.to:null));
if (this.tmp&&this.tmp.path){
this.toward=this.tmp.path;
}else{
console.log('link fail:')
console.log("./routes/"+this.props.to)
}
    }
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onClick: PropTypes.func,
    marginTop: PropTypes.string,
    marginBottom: PropTypes.string,
     padding: PropTypes.string,
     height: PropTypes.string,
     width: PropTypes.string
  };

 Mystyle = ()=>{
    return {
      marginTop: ((this.props.marginTop)?this.props.marginTop:margin_def)+'px',
      marginBottom: ((this.props.marginBottom)?this.props.marginBottom:margin_def)+'px',
      padding: ((this.props.padding)?this.props.padding:padding_def)+'px',
       height: 'auto',
        width: ((this.props.width)?this.props.width:"auto")
    }
  };

  render() {
  let myprops=Object.assign({}, this.props);
myprops.to=this.toward;
let _self=this;
function handleClick (event) {
    if (_self.props.onClick) {
      _self.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }
    event.preventDefault();
      if (this.to) {
        history.push(this.to);
      } else {
        history.push({
          pathname: event.currentTarget.pathname,
          search: event.currentTarget.search,
        });
      }
  }
  delete myprops.marginTop;
  delete myprops.marginBottom;
  delete myprops.padding;
const toward=this.toward;
    return <FlatButton href={history.createHref(toward)} {...myprops} onClick={handleClick} style={this.Mystyle()}/>
  }

}

export default Link;
