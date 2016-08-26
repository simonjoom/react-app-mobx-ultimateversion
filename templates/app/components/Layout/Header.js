import Navig from './Navigation';
import Link from '../Link';
import s from './Header.css';


function Header() {

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link className={s.title} to="Skiscool">
          <strong>SkiScool</strong>
        </Link>
        <Navig />
      </div>
    </header>
  );
}

export default Header;
