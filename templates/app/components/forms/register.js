import Form from 'mobx-ajv-form';
import schema from '~/temp/shared/schemas/user';
import dispatch from '~/temp/core/dispatch';

class RegisterForm extends Form {
  constructor(props) {
    super(props);
  }
  loginauth2 = (e) => {
    e.preventDefault();
    window.location.reload(true);
    return true;
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
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
}

export default new RegisterForm({
  schema,
  fields: {
    username: {
      label: 'Username',
    },
    email: {
      label: 'Email',
    },
    password: {
      label: 'Password',
    },
  },
});
