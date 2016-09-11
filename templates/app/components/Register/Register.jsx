import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import cx from 'classnames';
import { observer } from 'mobx-react';
import s from './style.css';
import Link from '../Linkmaterial';
import form from '../forms/register';

const errorMessage = cx('red', 'm2');

const Register = observer(() => {
  const myrefs = 'btn-disabled';
  return (
    <div className={s.container}>
      <p className={s.lead}>Register with Social Networking.</p>
      <Link
        className={s.facebook}
        to="/auth/facebook"
        flagRoute={false}
        onClick={form.loginauth2}
        key="1"
        width="100%"
        marginBottom="15"
        padding="5"
        hoverColor="#2d4373"
        backgroundColor="#3b5998"
        label="Log in with Facebook"
        icon={<i className="h1 fa fa-facebook" />}
      />
      <Link
        className={s.google}
        to="/auth/google"
        flagRoute={false}
        onClick={form.loginauth2}
        key="2"
        width="100%"
        marginBottom="15"
        padding="5"
        hoverColor="#c23321"
        backgroundColor="#dd4b39"
        label="Log in with Google"
        icon={<i className="h1 fa fa-google" />}
      />
      <Link
        className={s.twitter}
        to="/auth/twitter"
        flagRoute={false}
        onClick={form.loginauth2}
        key="3"
        width="100%"
        marginBottom="15"
        padding="5"
        hoverColor="#2795e9"
        backgroundColor="#55acee"
        label="Log in with twitter"
        icon={<i className="h1 fa fa-twitter" />}
      />
      <Divider />
      <span className="h1">OR</span>
      <form>
        	<TextField
						name={form.$('username').name}
						value={form.$('username').value}
						hintText={form.$('username').label}
						floatingLabelText={form.$('username').label}
						errorText={form.$('username').errorMessage}
						onChange={form.$('username').sync}
					/>
					<TextField
						name={form.$('email').name}
						value={form.$('email').value}
						hintText={form.$('email').label}
						floatingLabelText={form.$('email').label}
						errorText={form.$('email').errorMessage}
						onChange={form.$('email').sync}
					/>
					<TextField
						hintText={form.$('password').label}
						floatingLabelText={form.$('password').label}
						name={form.$('password').name}
						value={form.$('password').value}
						errorText={form.$('password').errorMessage}
						onChange={form.$('password').sync}
					/>
        <div className="mt3">
          <FlatButton
            type="submit"
            disabled={!form.isValid}
            className={cx({ [`${myrefs}`]: !form.isValid })}
						onClick={form.handleOnSubmit}
            backgroundColor="#a4c639"
            hoverColor="#8AA62F"
          >
            Login
          </FlatButton>
        </div>

        <div
          className={cx(errorMessage, { hide: !form.isValid && form.genericErrorMessage })}
        >
          {form.genericErrorMessage}
        </div>
      </form>
    </div>
  );
});

export default Register;
