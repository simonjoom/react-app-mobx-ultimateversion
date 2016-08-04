import s from './Footer.css';
import Link from '../Link';

function Footer() {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <span className={s.text}>© Your Company</span>
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="/">Home</Link>
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="/root">root</Link>
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="/privacy">Privacy</Link>
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="/not-found">Not Found</Link>
            </div>
        </div>
    );
}

export default Footer;
