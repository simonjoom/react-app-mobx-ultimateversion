import Layout from '../../components/Layout';
import s from './Contact.css';
import { PropTypes } from 'react';
const title = 'Contact Us';

const Contact=(props, context)=>{

  context.setTitle(title);
  return (
    <Layout className={s.content}>
        <h1>{title}</h1>
        <p>Email: simon@skiscool.com</p>
    </Layout>
  );
}

Contact.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Contact;
