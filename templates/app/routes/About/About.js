import { PropTypes } from 'react';
import Layout from '../../components/Layout';
import { observer } from "mobx-react";
import s from './About.css';
const mdo= require('./About_'+window.__lang__+'.md');

@observer(['appstate'])
class AboutPage extends React.Component {
    static propTypes = {
    appstate: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
    };
  static contextTypes = {
  setTitle: PropTypes.func.isRequired,
  setMeta: PropTypes.func,
 muiTheme: PropTypes.object.isRequired
  }

  render() {
      const appstate = this.props.appstate;
      const lang = this.props.lang;
  this.context.setTitle(title)
  const bp = appstate.ui.breakpoints;
  const title=mdo.title;
  const html=mdo.html;
  console.log(lang)
    return (
      <Layout className={s.content} bp={bp} comp={"About"} title={title} subtitle={title}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    );
  }

}

export default AboutPage;
