import { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Layout from '../../components/Layout';
import s from './style.css';

const ContactPage = (props, context) => {
// eslint-disable-next-line no-unused-vars
  const { appstate, lang, description, title,html } = props;
  if (description) {
    context.setMeta('description', description);
  }
  if (title) {
    context.setTitle(title);
  }
  const bp = appstate.ui.breakpoints;
  return (
    <Layout
      className={s.content}
      bp={bp}
      comp={"Contact"}
      title={"SkiScool Contact"}
      subtitle={"Email Contact"}
    >
    <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

ContactPage.contextTypes = {
  setTitle: PropTypes.func.isRequired,
  setMeta: PropTypes.func,
};

ContactPage.propTypes = {
  appstate: PropTypes.object.isRequired,
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default observer(['appstate'])(ContactPage);
