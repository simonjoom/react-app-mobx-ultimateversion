import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { observer } from 'mobx-react';
import Divider from 'material-ui/Divider';
import _ from 'lodash';

const cbf = (appstate) => {
  let k = 1;
  return _.map(_.toPlainObject(appstate), (val, key) => (
    <li key={key}>
      <If condition={_.isObject(val) && (k++)}>
        <ul key={k}>{key}{(cbf(val))}</ul>
        <Else />
        {`${key}:${val}`}
      </If>
    </li>
  ));
};

const Debug = (props) => (
  <Paper>
    <Divider />
    <ul>{cbf(props.appstate)}</ul>
  </Paper>
);

Debug.propTypes = {
  appstate: PropTypes.object,
};
export default observer(['appstate'])(Debug);
