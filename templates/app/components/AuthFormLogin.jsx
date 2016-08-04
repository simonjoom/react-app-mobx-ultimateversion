//import { connect } from '~/temp/utils/state';
import cx from 'classnames';

import FlatButton from 'material-ui/FlatButton';
import Link from './Linkmaterial';
import {observer} from "mobx-react";
// styles
const errorMessage = cx('red', 'm2');

// components
import TextField from 'material-ui/TextField';

//const AuthModal = ({ form }) => {

@observer(['context'])
class AuthModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let myrefs = 'btn-disabled';
        let form = this.props.form;
        return (
            <form>

<div className="col-8 px2 mx-auto">

<Link className="btn btn-lg btn-fb block" to="/auth/facebook" onClick={form.handleOnSubmit} hoverColor="#8AA62F" icon={<i className="mb3 fa fa-login" />} >
<div className="mb3"><i className="fa fa-facebook left"></i>Login with Facebook</div></Link>

<Link className="btn btn-lg btn-fb block" to="/auth/instagram" >
<div className="mb3"><i className="fa fa-instagram left"></i>Login with Instagram</div></Link>
</div>
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    name={form.fields.email.name}
                    value={form.fields.email.value}
                    onChange={form.syncValue}
                    errorText={form.fields.email.errorMessage}
                />
                <TextField
                    hintText="Password"
                    name={form.fields.password.name}
                    floatingLabelText="Password"
                    value={form.fields.password.value}
                    onChange={form.syncValue}
                    errorText={form.fields.password.errorMessage}
                />
                <div className="mt3">
                    <button
                        type="submit"
                        disabled={!form.isValid}
                        className={cx('btn','btn-primary',{
        [`${myrefs}`]: !form.isValid })}
                        onClick={form.handleOnSubmit}>Login
                    </button>
                </div>
                <div className={cx(errorMessage, {
        'hide': !form.isValid && form.genericErrorMessage,
      })}
                >
                    {form.genericErrorMessage}
                </div>
            </form>
        );
    }
}

AuthModal.propTypes = {
    form: React.PropTypes.object,
};

export default AuthModal;
