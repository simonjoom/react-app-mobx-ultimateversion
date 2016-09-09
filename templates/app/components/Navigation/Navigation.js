import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './style.css';
import Link from '../Linkmaterial';
import {observer} from 'mobx-react';

// eslint-disable-next-line no-unused-vars

const Navigation = ({appstate, className}) => {
    const {user} = appstate.auth;
    return (
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

    {user && user.uuid &&
      <Link
      className={cx(styles.link, className)}
      to="Profile"
    >profile</Link>
      }
    <span
      className={cx(styles.spacer, className)}
    > | </span>
    <Link
      className={cx(styles.link, styles.highlight, className)}
      to="test"
    >Test 404</Link>
  </div>
    )
};

Navigation.propTypes = {
    appstate: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default observer(['appstate'])(Navigation);
