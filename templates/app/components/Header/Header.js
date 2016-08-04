import s from './Header.css';
import Link from '../Link';
import logoUrl from './logo-small.png';

function Header() {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <Link className={s.brand} to="/">
                    <img src={logoUrl} width="38" height="38" alt="React"/>
                    <span className={s.brandTxt}>Your Company</span>
                </Link>
                <div className={s.banner}>
                    <h1 className={s.bannerTitle}>React</h1>
                    <p className={s.bannerDesc}>Complex web apps made easy</p>
                </div>
            </div>
        </div>
    );
}

export default Header;
