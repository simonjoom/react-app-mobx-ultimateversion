import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import Header from './Header';

const Layout = ({ comp, subtitle, title, ...props }) => {

    return(<div>
    <Header
      title={title}
      comp={comp}
      subtitle={subtitle}
    />
    <Divider />
    <main>
      <div
        {...props}
      />
    </main>
  </div>
)};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  comp: React.PropTypes.string.isRequired
};
export default Layout;
//export default Layout;
