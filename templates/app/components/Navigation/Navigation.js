import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './Navigation.css';
import Link from '../Linkmaterial';


const Navigation = ({ className }) => (
  <div
    className={cx(styles.root)}
    role="navigation"
  >
    <Link
      className={cx(styles.link)}
      to="About"
      hoverColor="#8AA62F"
      icon={<i
        className="mb3 fa fa-diamond"
      />}
    >
      About MySite
    </Link>
    <Link
      className={cx(styles.link, className)}
      to="Contact"
    >Contact</Link>
    <Link
      className={cx(styles.link, className)}
      to="Root"
    >Root</Link>
    <Link
      className={cx(styles.link, className)}
      to="Profile"
    >profile</Link>
    <span
      className={cx(styles.spacer, className)}
    > | </span>
    <Link
      className={cx(styles.link, styles.highlight, className)}
      to="test"
    >Test 404</Link>
  </div>
);

Navigation.propTypes = {
  className: PropTypes.string,
};

export default Navigation;
