import Form from 'mobx-react-form';
import validatorjs from 'validatorjs';
import dispatch from '~/temp/core/dispatch';

class RegisterForm extends Form {
  loginauth2 = (e) => {
    e.preventDefault();
    window.location.reload(true);
    return true;
  };

	handleOnSubmit = (e) => {
		e.preventDefault();

		this.validate().then((isValid) =>
		isValid && this.onSuccess());
	}

	onSuccess() {
      dispatch('auth.register', this.values())
          .then(() => dispatch('ui.accountModal.showLoginModal', true))
          .then(() => dispatch('ui.snackBar.open', 'Register Successful.'))
          .then(() => this.clear())
          .catch((err) => {
            console.log(err);
            this.invalidate(`The user already exist. ${err}`);
          });
    }
}


export default new RegisterForm({
	plugins: {
		dvr: validatorjs,
	},
  fields: {
    username: {
      label: 'Username',
			rules: 'required|string|between:5,20',
    },
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
