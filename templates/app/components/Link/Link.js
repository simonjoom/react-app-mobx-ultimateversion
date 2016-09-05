import React, { PropTypes, Component } from 'react';
import history from '../../core/history';
import s from './Link.css';

class Link extends Component {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.toward = '/';
    this.comp_href = './routes/Home';

    // find the component, if not found return in console the link with a problem
    const route = window.__routes__.find(x =>
      (x.component ? x.component === `./routes/${props.to}` : null)
    );
    if (route && route.path) {
      this.toward = route.path;
      this.comp_href = route.component;
    } else {
      console.log('link fail:');
      console.log(`./routes/${props.to}`);
    }
  }

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
    const { pathname, search } = event.currentTarget;
    if (this.toward) {
      history.push(this.toward);
    } else {
      history.push({ pathname, search });
    }
  };

  render() {
    let getComp = '0';
    const path = decodeURI(history.getCurrentLocation().pathname);
    const pathfind = window.__routes__.find(x => x.path === path);
    if (pathfind && pathfind.path) {
      getComp = pathfind.component;
    }
    const toward = this.toward;
    const linkClass = (comp, comp1) => (
      comp === comp1 ? `${s.link} ${s.highlight}` : `${s.link}`
    );

    const out = linkClass(getComp, this.comp_href);
    return (
      <a
        href={history.createHref(toward)}
        className={out}
        {...this.props}
        onClick={this.handleClick}
      />
    );
  }
}

export default Link;
