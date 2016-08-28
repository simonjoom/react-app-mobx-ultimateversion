import { Component ,PropTypes} from 'react';
import { observer } from "mobx-react";
import Root from '../../components/Root';
import Layout from '../../components/Layout';
const title = 'Root';
import s from './Root.css';

@observer(['appstate'])
class Rootpage extends Component {
    static propTypes = {
        appstate: PropTypes.object.isRequired
    };
  static contextTypes = {
  setTitle: PropTypes.func.isRequired,
  setMeta: PropTypes.func,
 muiTheme: PropTypes.object.isRequired
  }
    constructor(props) {
        super(props);
        //this.addItem = this.addItem.bind(this);
       // console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    }
    render() {
      const appstate = this.props.appstate;
  const bp = appstate.ui.breakpoints;
      this.context.setTitle(title);

     return (
 <Layout className={s.content} bp={bp} comp={"Root"} title={"Root STACK"} subtitle={"Universal App featuring: React + Feathers + MobX"}>
        <Root bp={bp}/>
 </Layout>
     )
    }
}

export default Rootpage;
//Root.contextTypes = { setTitle: PropTypes.func.isRequired };
