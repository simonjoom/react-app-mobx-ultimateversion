import { PropTypes,Component } from 'react';
import Login from '../../components/Login';
import Layout from '../../components/Layout';
import s from './Login.css';
import { observer } from "mobx-react";
const title = 'Log In';

@observer(['appstate'])
class LoginPage extends Component {
    static propTypes = {
    appstate: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
    };
  static contextTypes = {
  setTitle: PropTypes.func.isRequired,
  setMeta: PropTypes.func,
 muiTheme: PropTypes.object.isRequired
  }
  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
      const appstate = this.props.appstate;
      const lang = this.props.lang;
      console.log(lang)
  this.context.setTitle(title)
  const bp = appstate.ui.breakpoints;
    return (
 <Layout className={s.content} bp={bp} comp={"Login"} title={"SkiScool Login"} subtitle={"SkiScool Login"}>
  <Login />

<a href="/" onClick={this.goBack}>Go back</a>, or head over to the&nbsp;
<a href="/">home page</a>

</Layout>
    );
  }

}

export default LoginPage;
