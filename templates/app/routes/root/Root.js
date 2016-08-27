import { Component ,PropTypes} from 'react';
import { observer } from "mobx-react";
import Root from '../../components/Root';
import Layout from '../../components/Layout';
var _ = require('lodash');
const title = 'Root';
import cx from 'classnames';
import Divider from 'material-ui/Divider';
import s from './Root.css';

@observer(['appstate'])
class Rootpage extends Component {
    static propTypes = {
        appstate: PropTypes.object.isRequired
    };
  static contextTypes = {
  setTitle: React.PropTypes.func.isRequired,
  setMeta: React.PropTypes.func,
 muiTheme: React.PropTypes.object.isRequired
  }
    constructor(props) {
        super(props);
        //this.addItem = this.addItem.bind(this);
       // console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    }
    render() {
      const appstate = this.props.appstate;
      this.context.setTitle(title);
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

  const bp = appstate.ui.breakpoints;
     return (
 <Layout className={s.content}>
       <div className="center">
            <h1 className={cx(s.title, {
              [s.xsTitle]: bp.xs,
              [s.suTitle]: bp.su,
            })} >Root STACK</h1>
            <h2 className={cx(s.subTitle, {
              [s.xsSubTitle]: bp.xs,
              [s.suSubTitle]: bp.su,
            })}
            >Universal App featuring: React + Feathers + MobX
            </h2>
       </div>
       <Divider />
        <Root appstate={appstate}/>

     <ul>{cbf(appstate)}</ul>
 </Layout>
     )
    }
}

export default Rootpage;
//Root.contextTypes = { setTitle: PropTypes.func.isRequired };
