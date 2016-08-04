import s from './Contact.css';
import { PropTypes } from 'react';
const title = 'Contact Us';

function Contact(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>...</p>
      </div>
    </div>
  );
}

Contact.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Contact;
