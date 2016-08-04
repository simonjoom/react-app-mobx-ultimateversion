import Form from 'mobx-ajv-form';
import schema from '~/temp/shared/schemas/auth';
import dispatch from '~/temp/core/dispatch';

class AuthForm extends Form {
 loginfb = (e) => {
        e.preventDefault();
        dispatch('auth.loginfb')
            .then(() => dispatch('ui.authModal.toggle', 'close'))
            .then(() => dispatch('ui.snackBar.open', 'Login Successful.'))
            .then(() => this.clear())
            .catch((err) => this.invalidate(err.message));
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
new AuthForm({
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
