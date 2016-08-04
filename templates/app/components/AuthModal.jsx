import cx from 'classnames';
import _ from 'lodash';

import dispatch from '~/temp/core/dispatch';
import {observer} from "mobx-react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import AuthFormLogin from './AuthFormLogin.jsx';
import AuthFormRegister from './AuthFormRegister.jsx';

// styles
import modalBaseStyle from '../styles/_.modal.js';
const styles = _.cloneDeep(modalBaseStyle);
const buttonGroup = cx('btn', 'left', 'x-group-item');
const authSection = cx('center', 'fit', 'col-8', 'px2', 'mb3', 'mx-auto');

_.assign(styles.content, {
    maxWidth: '450px',
    maxHeight: '500px',
});

const handleCloseModal = () =>
    dispatch('ui.authModal.toggle', 'close');

const handleShowSigninSection = () =>
    dispatch('ui.authModal.toggleSection', 'signin');

const handleShowSignupSection = () =>
    dispatch('ui.authModal.toggleSection', 'signup');


const AuthModal2 = ({open, showSection, forms}) => {

    return (
        <Dialog
            title="Register or Login"
            modal={false}
            open={open}
            contentStyle={styles}
            onRequestClose={handleCloseModal}
        >
            <div className={cx('center','m3')}>
                <div className={cx('inline-block','clearfix')}>
                    <FlatButton
                        label="Login"
                        primary={true}
                        onClick={handleShowSigninSection}
                        className={cx(buttonGroup,'rounded-left', {
            'btn-primary': showSection === 'signin',
            'btn-outline': showSection !== 'signin',
          })}
                    />
                    <FlatButton
                        label="Register"
                        primary={true}
                        keyboardFocused={true}
                        className={cx(buttonGroup,'rounded-right', {
            'btn-primary': showSection === 'signup',
            'btn-outline': showSection !== 'signup',
          })}
                        onClick={handleShowSignupSection}
                    />
                </div>
            </div>
            <div className={cx(authSection, {'hide' : showSection !== 'signin' })}>
                <h3>Login</h3>
                <AuthFormLogin form={forms.login}/>
            </div>

            <div className={cx(authSection, {'hide': showSection !== 'signup' })}>
                <h3>Register</h3>
                <AuthFormRegister form={forms.register}/>
            </div>
        </Dialog>
    );
}

AuthModal2.propTypes = {
    open: React.PropTypes.bool,
    forms: React.PropTypes.object,
    showSection: React.PropTypes.string,
};


export default AuthModal2;
