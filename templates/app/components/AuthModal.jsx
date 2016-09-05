import cx from 'classnames';
import _ from 'lodash';
import dispatch from '~/temp/core/dispatch';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AuthFormLogin from './Login';
import AuthFormRegister from './Register';
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


const AuthModal2 = ({ open, showSection }) => (
  <Dialog
    title="Register / Login"
    modal={false}
    open={open}
    contentStyle={styles}
    onRequestClose={handleCloseModal}
  >
    <div className={cx('center', 'm3')}>
      <div className={cx('inline-block', 'clearfix')}>
        <FlatButton
          label="Login"
          primary
          keyboardFocused
          onClick={handleShowSigninSection}
          className={cx(buttonGroup, 'rounded-left', {
            'btn-primary': showSection === 'signin',
            'btn-outline': showSection !== 'signin',
          })}
        />
        <FlatButton
          label="Register"
          primary={false}
          className={cx(buttonGroup, 'rounded-right', {
            'btn-primary': showSection === 'signup',
            'btn-outline': showSection !== 'signup',
          })}
          onClick={handleShowSignupSection}
        />
      </div>
    </div>
    <div className={cx(authSection, { hide: showSection !== 'signin' })}>
      <h3>Login</h3>
      <AuthFormLogin />
    </div>

    <div className={cx(authSection, { hide: showSection !== 'signup' })}>
      <h3>Register</h3>
      <AuthFormRegister />
    </div>
  </Dialog>
);

AuthModal2.propTypes = {
  open: React.PropTypes.bool,
  showSection: React.PropTypes.string,
};


export default AuthModal2;
