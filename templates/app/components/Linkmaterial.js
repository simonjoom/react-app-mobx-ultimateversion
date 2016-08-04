import React, { Component, PropTypes } from 'react';
import history from '../core/history';
import FlatButton from 'material-ui/FlatButton';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onClick: PropTypes.func,
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
      if (this.props.to) {
        history.push(this.props.to);
      } else {
        history.push({
          pathname: event.currentTarget.pathname,
          search: event.currentTarget.search,
        });
      }
  };

  render() {
    const { to, ...props } = this.props; // eslint-disable-line no-use-before-define
    return <FlatButton href={history.createHref(to)} {...props} onClick={this.handleClick}/>
  }

}

export default Link;
