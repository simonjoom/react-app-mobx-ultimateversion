import Layout from '../../components/Layout';
import s from './GetStarted.css';
import { title, html } from './GetStarted.md';

class AboutPage extends React.Component {
 static contextTypes = {
setTitle: React.PropTypes.func.isRequired
}

  render() {
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
