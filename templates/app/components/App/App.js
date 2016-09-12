import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import DevTools from 'mobx-react-devtools';
import cx from 'classnames';
import dispatch from '~/temp/core/dispatch';
import { app } from '~/temp/shared/app';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import AppBar from './AppBar';
import AppNav from './AppNav';
import Debug from './Debug';
import style from './style.css';
import AuthModal from '../AuthModal';

// lazy loading chunk 'Account'
/*
 const checkaccountload=()=>{
 return new Promise(resolve => {
 require.ensure(['../Account'], () => {
 resolve(require('../Account'));
 }, "login");
 })
 }
 */


// important to load all framework css and disable eslint for that
// eslint-disable-next-line no-unused-vars
import s from './StyleApp.css';
console.log(s);

// dont remove console.log(s)

const handleThemeToggle = () => {
  dispatch('ui.theme.toggleTheme');
};

@observer(['context', 'appstate'])
class App extends Component {
  static propTypes = {
    context: PropTypes.shape({
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
      muiTheme: PropTypes.object.isRequired,
    }).isRequired,
    appstate: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    //    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.flagFirst = true;
  }

  getChildContext() {
    const context = this.props.context;
    return {
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
      muiTheme: this.props.appstate.ui.theme.getMui(),
    };
  }

  render() {
    const { ui, auth } = this.props.appstate;
    const isDev = true;
    const Debug = true;
    console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    const bp = ui.breakpoints;
    const { xs, su, mu } = bp;

    const SU = style.su;
    //if account still not loaded lazy load chunk of it on click
    /*
     to enable in production
     if (!ui.accountModal.Account &&
     ((ui.accountModal.flagSelectAccountModal ||
     ui.accountModal.flagCreateAccountModal ||
     ui.accountModal.flagShowLoginModal)))
     handleclicktoModal(checkaccountload);
     */

    return (
      <div>

        <AppNav
          open={ui.appNav.isOpen}
          docked={ui.appNav.isDocked}
          accountMenuIsOpen={ui.appBar.accountMenuIsOpen}
        >
          <Header />
        </AppNav>

        <If condition={isDev}>
          <DevTools position={{ bottom: 0, right: '15px' }}/>
        </If>

        <Paper className={cx({ [SU]: ui.layoutIsShifted, "m0": xs, "m1": su, "m2": mu })}>
          <Toggle
            label="Toggle Theme"
            defaultToggled={ui.theme.toggleThemestate}
            onToggle={handleThemeToggle}
          />

          <AppBar
            accountMenuIsOpen={ui.appBar.accountMenuIsOpen}
            layoutIsShifted={ui.layoutIsShifted}
            authCheck={auth.check}
            user={auth.user}
          />
          <div className={style.content, "clearfix"}>
            {this.props.children}
          </div>
          <If condition={Debug}>
            <Debug />
          </If>

        </Paper>
        <Paper className={cx({ [SU]: ui.layoutIsShifted }, { m0: xs, m1: su, m2: mu })}
        >
          <Feedback />
        </Paper>
        <Footer />
        <Snackbar
          open={ui.snackBar.isOpen}
          message={ui.snackBar.message}
          autoHideDuration={ui.snackBar.duration}
          onRequestClose={ui.snackBar.close}
        />
        <AuthModal
          open={ui.authModal.isOpen}
          showSection={ui.authModal.showSection}
        />
      </div>
    );
  }
}
// {ui.accountModal.Account && <ui.accountModal.Account /> }
export default App;
