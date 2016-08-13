import { Component ,PropTypes} from 'react';
import { observer } from "mobx-react";
var _ = require('lodash');
import cx from 'classnames';
//import s from './Home.css';
import s from '../../styles/home.css';

const title = 'Testdd';
@observer(['context','appstate'])
class Root extends Component {
    constructor(props) {
        super(props);
        //this.addItem = this.addItem.bind(this);
       // console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    }
    render() {
      const appstat = this.props.appstate;

let k=1;
function cbf(appstat){
return _.map(_.toPlainObject(appstat),function(val,key) {
       return (<li key={key}>
       {
       (_.isObject(val)&&(k++))?
       (<ul key={k}>{key}{(cbf(val))}</ul>):(key+':'+val)
       }</li>)

       })
       }
       const bp = appstat.ui.breakpoints;
     return (
      <div>
        <div className="center">
            <h1 className={cx(s.title, {
              [s.xsTitle]: bp.xs,
              [s.suTitle]: bp.su,
            })}
            >RFX STACK</h1>
            <h2 className={cx(s.subTitle, {
              [s.xsSubTitle]: bp.xs,
              [s.suSubTitle]: bp.su,
            })}
            >Universal App featuring: React + Feathers + MobX
            </h2>
        </div>
        <div className={s.features}>
          <div className="center">
            <div className="md-flex mx4">
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-eye" />
                <br /> MobX Reactive State Management
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-bolt" />
                <br /> Blazing fast Real Time by
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-arrows-h" />
                <br /> React HOC for Responsive Media Queries
              </div>
            </div>
            <div className="md-flex mx4">
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-recycle" />
                <br /> Isomorphic Fetch/Socket
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-cube" />
                <br /> Microservices Ready
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-diamond" />
                <br /> Multi Platform Ready
              </div>
            </div>
            <div className="md-flex mx4">
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-fire" />
                <br /> React Hot Loader 3
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-gears" />
                <br /> Action Dispatcher for Stateless Components
              </div>
              <div className="sm-col-12 p4">
                <i className="mb3 fa fa-object-ungroup" />
                <br /> Modular CSS for React
              </div>
            </div>
          </div>
          {/* <i className="fa fa-github" /> Completely Free and Open Source */}
        </div>

     <ul>{cbf(appstat)}</ul>
     </div>
     )
    }
}

export default Root;
//Root.contextTypes = { setTitle: PropTypes.func.isRequired };
