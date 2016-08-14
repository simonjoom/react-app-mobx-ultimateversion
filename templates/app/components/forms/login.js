import Form from 'mobx-ajv-form';
import schema from '~/temp/shared/schemas/auth';
import dispatch from '~/temp/core/dispatch';
import history from '~/temp/core/history';

class LoginForm extends Form {
 loginauth2 = (e) => {
window.location.reload(true);return true;
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (!this.validate()) return;

        dispatch('auth.login', this.values())
           .then(() => dispatch('ui.authModal.toggle', 'close'))
            .then(() => dispatch('ui.snackBar.open', 'Login Successful.'))
            .then(() => this.clear())
            .catch((err) => this.invalidate(err.message));
    }
}

export default
new LoginForm({
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
