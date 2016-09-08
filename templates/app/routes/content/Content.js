import { Component, PropTypes } from 'react';
import s from './style.css';

class Content extends Component {

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }}/>
        </div>
      </div>
    );
  }

}

export default Content;
