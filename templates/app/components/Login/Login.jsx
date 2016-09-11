import React from 'react';
import cx from 'classnames';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { observer } from 'mobx-react';

import s from './Login.css';
import Link from '../Linkmaterial';
import form from '../forms/login';

const errorMessage = cx('red', 'm2');
const Login = observer(() => {
  const myrefs = 'btn-disabled';
  return (
    <div className={s.container}>
      <p className={s.lead}>Log in with your username or company email address.</p>
      <Link
        className={s.facebook}
        flagRoute={false}
        to="/auth/facebook"
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
        flagRoute={false}
        to="/auth/google"
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
        flagRoute={false}
        to="/auth/twitter"
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
					hintText="Email"
					floatingLabelText="Email"
					name={form.$('email').name}
					value={form.$('email').value || ''}
					onChange={form.$('email').sync}
					errorText={form.$('email').errorMessage}
				/>
				<TextField
					hintText="Password"
					floatingLabelText="Password"
					name={form.$('password').name}
					value={form.$('password').value || ''}
					onChange={form.$('password').sync}
					errorText={form.$('password').errorMessage}
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
        <div className={cx(errorMessage, { hide: !form.isValid && form.genericErrorMessage })}>
          {form.genericErrorMessage}
        </div>
      </form>
    </div>
  );
});
export default Login;
