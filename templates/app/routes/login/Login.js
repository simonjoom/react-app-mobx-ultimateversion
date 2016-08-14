import { PropTypes,contextTypes } from 'react';
import Login from '../../components/Login';
import Layout from '../../components/Layout';
import s from './Login.css';
const title = 'Log In';


class LoginPage extends React.Component {
  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

render() {
 return (
 <Layout className={s.content}>
   <h1>{title}</h1>
  <Login />

<a href="/" onClick={this.goBack}>Go back</a>, or head over to the&nbsp;
<a href="/">home page</a>

</Layout>
    );
  }

}

LoginPage.contextTypes = { setTitle: PropTypes.func.isRequired };

export default LoginPage;
