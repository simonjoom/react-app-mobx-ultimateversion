import React, { PropTypes } from 'react';
import cx from 'classnames';
import Navigation from './Navigation';
import Link from '../Link';
import styles from './Header.css';

const Header = ({ title, subtitle, bp, comp }) => {
  const h1ClassName = cx(styles.title, {
    [styles.xsTitle]: bp.xs,
    [styles.suTitle]: bp.su,
  });
  const h2ClassName = cx(styles.subTitle, {
    [styles.xsSubTitle]: bp.xs,
    [styles.suSubTitle]: bp.su,
  });
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.title} to={comp}>
          <h1 className={h1ClassName}>{title}</h1>
          <h2 className={h2ClassName}>{subtitle}</h2>
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  comp: PropTypes.string.isRequired,
  bp: PropTypes.object.isRequired,
};
export default Header;
