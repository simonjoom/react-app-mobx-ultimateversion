import Paper from 'material-ui/Paper';
import {observer} from "mobx-react"
import Divider from 'material-ui/Divider';
import _ from "lodash"

const Debug = (props) => {
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

  return (
  <Paper>
  <Divider/>
<ul>{cbf(props.appstate)}</ul>
</Paper>
    );
};

Debug.propTypes = {
    appstate: React.PropTypes.object
};
export default observer(['appstate'])(Debug);
