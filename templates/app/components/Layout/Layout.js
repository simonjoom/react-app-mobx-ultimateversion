import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Header from './Header';
import styles from './Layout.css';
import Debug from './Debug';

const Layout = ({ comp, subtitle, title, bp, className, ...props }) => (
  <div className={styles.root}>
    <Header
      title={title}
      comp={comp}
      subtitle={subtitle}
      bp={bp}
    />
    <Divider />
    <main className={styles.content}>
      <Paper
        {...props}
        className={`${styles.content}${className ? ` ${className}` : ''}`}
      />
    </main>
    <Debug />
  </div>
);

Layout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  comp: React.PropTypes.string.isRequired,
  bp: PropTypes.object.isRequired,
};
export default Layout;
