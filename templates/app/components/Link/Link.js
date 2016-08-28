import { PropTypes } from 'react';
import history from '../../core/history';
import s from './Link.css';

class Link extends React.Component {
constructor(props) {
        super(props);
this.toward="/";
this.comp_href="./routes/Home";

//find the component, if not found return in console the link with a problem
this.tmp=window.__routes__.find(x=>(x.component?x.component=== "./routes/"+this.props.to:null));
if (this.tmp&&this.tmp.path){
this.toward=this.tmp.path;
this.comp_href=this.tmp.component;
}else{
console.log('link fail:')
console.log("./routes/"+this.props.to)
}
    }

  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onClick: PropTypes.func,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (event.button !== 0 /* left click */) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
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
  let get_comp="0";
  const path = decodeURI(history.getCurrentLocation().pathname);
const pathfind=window.__routes__.find(x =>x.path=== path);
if (pathfind&&pathfind.path){
get_comp=pathfind.component;
}
 const toward=this.toward;
  const linkClass = (comp,comp_href) => (((comp == comp_href)? `${s.link} ${s.highlight}` : `${s.link}`));

    const out=linkClass(get_comp,this.comp_href);

    const {...props } = this.props; // eslint-disable-line no-use-before-define
    return <a href={history.createHref(toward)} className={out}  {...props} onClick={this.handleClick} />;
  }
}

export default Link;
