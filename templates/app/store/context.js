import Context from '~/src/core/Context';
import { PropTypes } from 'react';

/**
  Context Types
 */
export default new Context({
  store: PropTypes.object,
  router: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  muiTheme: PropTypes.object,
});
