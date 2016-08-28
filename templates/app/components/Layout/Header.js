import Navig from './Navigation';
import Link from '../Link';
import s from './Header.css';
import cx from 'classnames';

function Header(props) {
const title=props.title;
const subtitle=props.subtitle;
const bp=props.bp;
const comp=props.comp;
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link className={s.title} to={comp}>
            <h1 className={cx(s.title, {
              [s.xsTitle]: bp.xs,
              [s.suTitle]: bp.su,
            })} >{title}</h1>
            <h2 className={cx(s.subTitle, {
              [s.xsSubTitle]: bp.xs,
              [s.suSubTitle]: bp.su,
            })}
            >{subtitle}
            </h2>
        </Link>
        <Navig />
      </div>
    </header>
  );
}
Header.propTypes = {title: React.PropTypes.string.isRequired,
subtitle: React.PropTypes.string.isRequired,
comp: React.PropTypes.string.isRequired,
bp: React.PropTypes.object.isRequired};
export default Header;
