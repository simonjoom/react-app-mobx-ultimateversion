import Form from 'mobx-ajv-form';
import schema from '~/temp/shared/schemas/user';
import dispatch from '~/temp/core/dispatch';

class UserForm extends Form {

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (!this.validate()) return;

        dispatch('auth.register', this.values())
        .then((token) => console.log(token))
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
new UserForm({
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
