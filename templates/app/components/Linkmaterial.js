import { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import history from '../core/history';


const Paddingdef = '5';
const Margindef = '0';


class Link extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    marginTop: PropTypes.string,
    marginBottom: PropTypes.string,
    padding: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    flagRoute: PropTypes.bool,
  };
  static defaultProps = {
    flagRoute: true,
  }
  constructor(props) {
    super(props);
    console.info('props', props);
    if (this.props.to) {
      const prefix = props.flagRoute ? './routes' : '';
      if (props.flagRoute) {
        this.toward = '/';
        this.tmp = window.__routes__.find(
          x => (
            x.component ? x.component === `${prefix}/${this.props.to}` : null
          ));
        if (this.tmp && this.tmp.path) {
          this.toward = this.tmp.path;
        } else {
          console.log('link fail:');
          console.log(`./routes/${this.props.to}`);
        }
      } else {
        this.toward = `${prefix}${this.props.to}`;
      }
    }
  }

  Mystyle = () => {
    const pr = {
      marginTop: `${((this.props.marginTop) ? this.props.marginTop : Margindef)}px`,
      marginBottom: `${((this.props.marginBottom) ? this.props.marginBottom : Margindef)}px`,
      padding: `${((this.props.padding) ? this.props.padding : Paddingdef)}px`,
      height: 'auto',
      width: ((this.props.width) ? this.props.width : 'auto'),
    };
    return pr;
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
    const myprops = Object.assign({}, this.props);
    let toward;
    delete myprops.marginTop;
    delete myprops.marginBottom;
    delete myprops.padding;
    delete myprops.onClick;
    delete myprops.flagRoute;
    if (!this.toward) {
      toward = '';
    } else toward = this.toward;
    return (<FlatButton
      href={history.createHref(toward)}
      {...myprops}
      onClick={this.handleClick}
      onTouchTap={this.handleTouchTap}
      style={this.Mystyle()}
    />);
  }

}

export default Link;
