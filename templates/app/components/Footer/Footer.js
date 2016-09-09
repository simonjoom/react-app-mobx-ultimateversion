import React from 'react';
import styles from './style.css';
import Link from '../Link';

const Footer = () => (
  <div className={styles.root}>
    <div className={styles.container}>
      <span className={styles.text}>© SkiScool</span>
      <span className={styles.spacer}>·</span>
      <Link className={styles.link} to="Home">Home</Link>
      <span className={styles.spacer}>·</span>
      <Link className={styles.link} to="Root">Root</Link>
      <span className={styles.spacer}>·</span>
      <Link className={styles.link} to="Privacy">Privacy</Link>
    </div>
  </div>
);

export default Footer;
