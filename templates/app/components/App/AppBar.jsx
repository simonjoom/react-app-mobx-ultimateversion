import dispatch from '~/temp/core/dispatch';
import cx from 'classnames';
import MenuLinksSX from './MenuLinksSX.jsx';
import MenuLinksDX from './MenuLinksDX.jsx';
import Flag from './Flag.jsx';

// styles
import styles from './app.bar.css';

// events
const handleNavToggle = (e) => {
    e.preventDefault();
    dispatch('ui.appNav.open');
};

function AppBar({authCheck, user, accountMenuIsOpen, layoutIsShifted}) {
    const button = cx('btn', 'inline-block', 'py2', 'm0');
    const appBar = cx('clearfix', 'right', 'animated', 'fadeIn');
    return (
        <div className={cx(styles.bar, appBar, {
    [styles.leftShifted]: layoutIsShifted,
    'left-0': !layoutIsShifted,
  })}
        >
            <div className={cx('left','lg-hide')}>
                <a onClick={handleNavToggle} className={button}>
                    <i className="fa fa-bars"/>
                </a>
                <MenuLinksSX inline styles/>
            </div>
            <div className={cx('left','lg-show')}>
                <a onClick={handleNavToggle} className={button}>
                    <i className="fa fa-bars fa-2x"/>
                </a>
                <MenuLinksSX styles/>
            </div>
            <div className="right">
            <Flag/>
                <div className="inline-block">
                    <div className="relative">
                        <MenuLinksDX inline
                                     user={user}
                                     authCheck={authCheck}
                                     accountMenuIsOpen={accountMenuIsOpen}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('clearfix','sm-hide')}></div>
            <div className={cx('overflow-hidden','px2')}>
            </div>
        </div>
    );
}

AppBar.propTypes = {
    user: React.PropTypes.object,
    authCheck: React.PropTypes.bool,
    layoutIsShifted: React.PropTypes.bool,
    accountMenuIsOpen: React.PropTypes.bool
};

export default AppBar;
