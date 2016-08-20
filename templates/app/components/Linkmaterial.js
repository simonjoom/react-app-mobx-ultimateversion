import React, { Component, PropTypes } from 'react';
import history from '../core/history';
import FlatButton from 'material-ui/FlatButton';
var _ = require('lodash');

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
_.map(window.__routes__,(val,key)=> {
if (val.component=="./routes/"+this.props.to){
this.toward=val.path;return;
}
});
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
  handleClick = (event) => {

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
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
  delete myprops.marginTop;
  delete myprops.marginBottom;
  delete myprops.padding;
    const {to, ...props } = this.props; // eslint-disable-line no-use-before-define
const toward=this.toward;
    return <FlatButton href={history.createHref(toward)} {...myprops} onClick={this.handleClick} style={this.Mystyle()}/>
  }

}

export default Link;
