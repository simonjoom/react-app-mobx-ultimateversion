import { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import Login from '../../components/Login';
import Layout from '../../components/Layout';
import s from './style.css';

@observer(['appstate'])
class LoginPage extends Component {
  static propTypes = {
    appstate: PropTypes.object.isRequired,
    lang: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func,
    muiTheme: PropTypes.object.isRequired,
  };
  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
// eslint-disable-next-line no-unused-vars
    const { appstate, lang, description, title } = this.props;
    this.context.setTitle(title);
    this.context.setMeta('description', description);
    const bp = appstate.ui.breakpoints;
    return (
      <Layout
        className={s.content}
        bp={bp}
        comp={"Login"}
        title={"SkiScool Login"}
        subtitle={"SkiScool Login"}
      >
        <Login />

        <a href="/" onClick={this.goBack}>Go back</a>, or head over to the&nbsp;
        <a href="/">home page</a>

      </Layout>
    );
  }

}

export default LoginPage;
