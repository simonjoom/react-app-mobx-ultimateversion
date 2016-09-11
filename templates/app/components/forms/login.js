// eslint-disable import/no-unresolved
import Form from 'mobx-react-form';
import validatorjs from 'validatorjs';
import dispatch from '~/temp/core/dispatch';

class LoginForm extends Form {
	loginauth2 = (e) => {
		e.preventDefault();
		window.location.reload(true);
		return true;
	};
	handleOnSubmit = (e) => {
		e.preventDefault();

		this.validate()
			.then((isValid) =>
			isValid && this.onSuccess());
	}


	onSuccess() {
      dispatch('auth.login', this.values())
        .then(() => dispatch('ui.authModal.toggle', 'close'))
        .then(() => dispatch('ui.snackBar.open', 'Login Successful.'))
        .then(() => this.clear())
        .catch((err) => this.invalidate(err.message));
  };
}

export default new LoginForm({
	plugins: {
		dvr: validatorjs,
	},
  fields: {
    email: {
      label: 'Email',
			rules: 'required|email|string|between:5,20',
    },
    password: {
      label: 'Password',
			rules: 'required|string|between:5,20',
    },
  },
});
