import Layout from '../../components/Layout';
import s from './Contact.css';
import { PropTypes } from 'react';
const title = 'Contact Us';
import { observer } from "mobx-react";

const Contact=(props,context)=>{
  context.setTitle(title)

  const bp = props.appstate.ui.breakpoints;
  let k=1;
function cbf(appstate){
return _.map(_.toPlainObject(appstate),function(val,key) {
       return (<li key={key}>
       {
       <If condition={_.isObject(val)&&(k++)}>
       <ul key={k}>{key}{(cbf(val))}</ul>
       <Else />
        {key+':'+val}
       </If>
       }
       </li>)
       })
       }

    return (
 <Layout className={s.content} bp={bp} comp={"Contact"} title={"SkiScool Contact"} subtitle={"Email Contact"}>
        <p>Email: simon@skiscool.com</p>
        <ul>{cbf(props.appstate)}</ul>
    </Layout>
  );
}

Contact.contextTypes = { setTitle: PropTypes.func.isRequired };
Contact.propTypes = {appstate: PropTypes.object};
export default observer(['appstate'])(Contact);
