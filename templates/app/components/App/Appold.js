import { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import DevTools from 'mobx-react-devtools';
import { observer } from "mobx-react";


@observer(['context','appstate'])
export default class App extends Component {
   static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }).isRequired,
    appstate: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };
 constructor(props) {
    super(props)
//this.state = { isMounted: false }
  }
  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

componentDidMount() {
   // this.setState({ isMounted: true })
  }

  render() {

        console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    return (
        <div>
           <DevTools position={ { top: 0, right: 100 } } />
          <Header />
           <div>
          {this.props.children}
           </div>
          <Feedback />
          <Footer />
        </div>
    );
  }

}

export default App;
