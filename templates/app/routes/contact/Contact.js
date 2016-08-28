import Layout from '../../components/Layout';
import s from './Contact.css';
import { PropTypes } from 'react';
const title = 'Contact Us';
import { observer } from "mobx-react";

const Contact=(props,context)=>{
  context.setTitle(title)

  const bp = props.appstate.ui.breakpoints;

    return (
 <Layout className={s.content} bp={bp} comp={"Contact"} title={"SkiScool Contact"} subtitle={"Email Contact"}>
        <p>Email: simon@skiscool.com</p>
    </Layout>
  );
}

Contact.contextTypes = { setTitle: PropTypes.func.isRequired };
Contact.propTypes = {appstate: PropTypes.object};
export default observer(['appstate'])(Contact);
