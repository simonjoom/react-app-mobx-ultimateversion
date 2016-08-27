import s from './Footer.css';
import Link from '../Link';

function Footer() {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <span className={s.text}>© SkiScool</span>
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="Home">Home</Link>
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="Root">Root</Link>
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="Privacy">Privacy</Link>
            </div>
        </div>
    );
}

export default Footer;
