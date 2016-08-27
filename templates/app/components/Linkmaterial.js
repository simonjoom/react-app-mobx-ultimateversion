import { Component, PropTypes } from 'react';
import history from '../core/history';
import FlatButton from 'material-ui/FlatButton';


const padding_def="5";
const margin_def="0";


class Link extends Component { // eslint-disable-line react/prefer-stateless-function
constructor(props) {
        super(props);
        if (this.props.to){
this.toward="/";
this.tmp=window.__routes__.find(x=>(x.component?x.component=== "./routes/"+this.props.to:null));
if (this.tmp&&this.tmp.path){
this.toward=this.tmp.path;
}else{
console.log('link fail:')
console.log("./routes/"+this.props.to)
}
}
    }
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };
handleTouchTap = (event) => {
    if (event.button && event.button !== 0) {
      return;
    }
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }
      if (this.toward) {
       history.push(this.toward);
    } else {
      history.push({
        pathname: event.currentTarget.pathname,
        search: event.currentTarget.search,
      });
    }
  };
  render() {
  let myprops=Object.assign({}, this.props);
let toward;
  delete myprops.marginTop;
  delete myprops.marginBottom;
  delete myprops.padding;
  delete myprops.onClick;
  if (this.toward)
  toward=this.toward;
else
toward="";
    return <FlatButton href={history.createHref(toward)} {...myprops} onClick={this.handleClick} onTouchTap={this.handleTouchTap} style={this.Mystyle()}/>
  }

}

export default Link;
