import Layout from '../../components/Layout';
import s from './GetStarted.css';
const mdo= require('./GetStarted_'+window.__lang__+'.md');

class AboutPage extends React.Component {
 static contextTypes = {
setTitle: React.PropTypes.func.isRequired
}

  render() {
  let title=mdo.title;
  let html=mdo.html;
  console.log(this.props)
  this.context.setTitle(title)
    return (
      <Layout className={s.content}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    );
  }

}

export default AboutPage;
