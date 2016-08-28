import {Component,PropTypes} from 'react';
import s from './Register.css';
import Layout from '../../components/Layout';
import Profile from '../../components/Profile';

import {observer} from "mobx-react"
const title = 'Profile';

@observer(['appstate'])
class Register extends Component {
  static propTypes = {
        appstate: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
        }
static contextTypes = {
setTitle: PropTypes.func.isRequired
}
 goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
  const {auth,ui} = this.props.appstate;
      const lang = this.props.lang;
      console.log(lang)
  this.context.setTitle(title)
  const bp = ui.breakpoints;
    return (
 <Layout className={s.content} bp={bp} comp={"Login"} title={"SkiScool Login"} subtitle={"SkiScool Login"}>
  <Profile user={auth.user}/>
    </Layout>
  )
}
}

//Register.PropTypes = { appstate: React.PropTypes.object.isRequired, };
//Register.contextTypes = { setTitle: PropTypes.func.isRequired, };

export default Register;
