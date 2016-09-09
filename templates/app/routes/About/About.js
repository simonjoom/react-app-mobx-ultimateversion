import { PropTypes } from 'react';
import styles from './style.css';

class AboutPage extends React.Component {
  static propTypes = {
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
    const { lang, description,html,title,h1,h2} = this.props;

    this.context.setMeta('description', description);

    this.context.setTitle(title);

    return (
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

}

export default AboutPage;
