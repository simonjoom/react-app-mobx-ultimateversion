// eslint-disable import/no-unresolved
import Form from 'mobx-ajv-form';
import schema from '~/temp/shared/schemas/auth';
import dispatch from '~/temp/core/dispatch';

class LoginForm extends Form {
  loginauth2 = (e) => {
    e.preventDefault();
    window.location.reload(true);
    return true;
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      dispatch('auth.login', this.values())
        .then(() => dispatch('ui.authModal.toggle', 'close'))
        .then(() => dispatch('ui.snackBar.open', 'Login Successful.'))
        .then(() => this.clear())
        .catch((err) => this.invalidate(err.message));
    }
  };
}

export default new LoginForm({
  schema,
  fields: {
    email: {
      label: 'Email',
    },
    password: {
      label: 'Password',
    },
  },
});
