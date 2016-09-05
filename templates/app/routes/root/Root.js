import { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Root from '../../components/Root';
import Layout from '../../components/Layout';
import s from './Root.css';

@observer(['appstate'])
class Rootpage extends Component {
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
  };

  constructor(props) {
    super(props);
    console.log(props);
    // this.addItem = this.addItem.bind(this);
    // console.log(typeof window === 'object' ? 'client-side' : 'server-side');
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { appstate, lang, description, title } = this.props;
    this.context.setTitle(title);
    console.log(lang);
    this.context.setMeta('description', description);

    const bp = appstate.ui.breakpoints;
    this.context.setTitle(title);

    return (
      <Layout
        className={s.content}
        bp={bp}
        comp={"Root"}
        title={"Root STACK"}
        subtitle={"Universal App featuring: React + Feathers + MobX"}
      >
        <Root bp={bp} />
      </Layout>
    );
  }
}

export default Rootpage;
// Root.contextTypes = { setTitle: PropTypes.func.isRequired };
