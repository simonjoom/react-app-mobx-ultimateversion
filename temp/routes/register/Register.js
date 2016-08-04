
import React, { PropTypes } from 'react';
import s from './Register.css';

const title = 'New User Registration';

function Register(props, context) {
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

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Register;
