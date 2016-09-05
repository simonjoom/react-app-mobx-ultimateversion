import React from 'react';
import s from './Header.css';
import Link from '../Link';

const Header = () => (
  <div className={s.container}>
    <Link className={s.brand} to="Skiscool">
      <img src="/icons/logo.png" width="38" height="38" alt="React" />
      <span className={s.brandTxt}>SkiScool</span>
    </Link>
    <div className={s.banner}>
      <h1 className={s.bannerTitle}>{window.dico.skischool}</h1>
      <p className={s.bannerDesc}>{window.dico.findinstructor}</p>
    </div>
  </div>
);

export default Header;
