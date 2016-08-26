import Form from 'mobx-ajv-form';
import schema from '~/temp/shared/schemas/user';
import dispatch from '~/temp/core/dispatch';

class RegisterForm extends Form {
 loginauth2 = (e) => {
 e.preventDefault();window.location.reload(true);
return true;
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (!this.validate()) return;

        dispatch('auth.register', this.values())
            .then(() => dispatch('ui.authModal.toggleSection', 'signin'))
            .then(() => dispatch('ui.snackBar.open', 'Register Successful.'))
            .then(() => this.clear())
            .catch((err) => {
            console.log(err);
            this.invalidate('The user already exist.'+err)
            }
            );
    }
}

export default
new RegisterForm({
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
