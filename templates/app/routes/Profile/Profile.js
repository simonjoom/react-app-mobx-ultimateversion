import { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import s from './style.css';
import Profile from '../../components/Profile';

@observer(['appstate'])
class ProfilePage extends Component {
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

    const { auth, ui } = appstate;
    return (
        <Profile user={auth.user} />
    );
  }
}

// Register.PropTypes = { appstate: React.PropTypes.object.isRequired, };
// Register.contextTypes = { setTitle: PropTypes.func.isRequired, };

export default ProfilePage;
