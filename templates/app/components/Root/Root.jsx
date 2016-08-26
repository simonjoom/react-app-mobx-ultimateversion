import s from './Root.css';
import cx from 'classnames';
import Divider from 'material-ui/Divider';

const Root = ({appstate}) => {
  const bp = appstate.ui.breakpoints;
 // console.log(context);
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
       <Divider />
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
        </div>

      </div>
  );
}

Root.propTypes = {appstate: React.PropTypes.object.isRequired};
/*Root.contextTypes = {
  setTitle: React.PropTypes.func.isRequired,
  setMeta: React.PropTypes.func,
 muiTheme: React.PropTypes.object.isRequired
  }*/

export default Root;