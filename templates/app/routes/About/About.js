import { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Layout from '../../components/Layout';
import s from './About.css';


@observer(['appstate'])
class AboutPage extends React.Component {
  static propTypes = {
    appstate: PropTypes.object.isRequired,
    lang: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  };
  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func,
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
// eslint-disable-next-line no-unused-vars
    const { appstate, lang, description,html,title } = this.props;

    this.context.setMeta('description', description);

    const bp = appstate.ui.breakpoints;
    this.context.setTitle(title);
    console.log(lang);
    return (
      <Layout className={s.content} bp={bp} comp={"About"} title={title} subtitle={title}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    );
  }

}

export default AboutPage;
