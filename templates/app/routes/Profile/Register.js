import {Component,PropTypes,contextTypes } from 'react';
import s from './Register.css';
import Layout from '../../components/Layout';
import Profile from '../../components/Profile';

import {observer} from "mobx-react"
const title = 'Profile';

@observer(['appstate'])
class Register extends Component {

 goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
  const {auth} = this.props.appstate;
    return (
 <Layout className={s.content}>
   <h1>{title}</h1>
<Profile user={auth.user}/>
    </Layout>
  )
}
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired, };

export default Register;
