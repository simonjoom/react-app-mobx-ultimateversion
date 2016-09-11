import React, { PropTypes } from 'react';
import dispatch from '~/temp/core/dispatch';
import cx from 'classnames';

import Link from '../Linkmaterial';
import Link2 from '../Link';
// styles
import styles from './menu.link.dx.css';

const menuAccount = cx('absolute', 'right-0', 'nowrap', 'rounded');
const btnBlock = cx('btn', 'block', 'py2', 'm0');
const btnInline = cx('btn', 'inline-block', 'py2', 'm0');

const handleMenuAccountToggle = (e) => {
	e.preventDefault();
	dispatch('ui.appBar.toggleAccountMenu');
};

const handleAuthModalSignin = (e) => {
	e.preventDefault();
	dispatch('ui.authModal.toggle', 'open', 'signin');
};

const handleAuthModalSignup = (e) => {
	e.preventDefault();
	dispatch('ui.authModal.toggle', 'open', 'signup');
};

const handleProfile = (e) => {
	e.preventDefault();
	dispatch('auth.logout');
};

const handleLogout = (e) => {
	e.preventDefault();
	dispatch('auth.logout');
};

const UserSubMenu = () => {
	const ul = cx('list-reset', 'mb0');
	return (
		<ul className={ul}>
			<li>
				<Link
					to="Profile"
					key="1"
					hoverColor="#c2c22F"
					onClick={handleProfile}
					icon={<i className="mb3 fa fa-user"/>}
				>
					Profile
				</Link>
			</li>
			<li>
				<Link
					to="Settings"
					key="2"
					hoverColor="#c2c22F"
					icon={<i className="mb3 fa fa-sliders"/>}
				>
					Settings
				</Link>
			</li>
			<li>
				<Link
					to="#"
					key="3"
					onClick={handleLogout}
					hoverColor="#c2c22F"
					icon={<i className="mb3 fa fa-sign-out"/>}
				>
					Sign Out
				</Link>
			</li>
		</ul>
	);
};
const MenuLinksDX = ({ user, inline, authCheck, accountMenuIsOpen }) => (
	<span>
    <div className={cx(styles.divider, { 'border-top': !inline })}/>
    <If condition={authCheck}>
      <span>
        <a
	        onClick={inline && handleMenuAccountToggle}
	        className={inline ? btnInline : btnBlock}
        >
          {user.email} { inline && <i className="fa fa-caret-down"/> }
        </a>
        <If condition={inline}>
          <div
	          className={cx(
		          [styles.menuAccount, menuAccount],
		          { hide: !accountMenuIsOpen }
	          )}
          >
            <UserSubMenu />
          </div>
          <Else />
          <div className={cx(styles.divider, { 'border-top': !inline })}/>
          <UserSubMenu />
        </If>
      </span>
      <Else />
      <Link
	      to="#"
	      onClick={handleAuthModalSignin}
	      className={cx(styles.baseBtn, {
		      [styles.baseInlineBtn]: inline,
		      [styles.loginBtn]: inline,
		      'inline-block': inline,
		      block: !inline,
	      })
	      }
	      key="1"
	      hoverColor="#c2c222"
	      icon={<i className="mb3 fa fa-sign-in"/>}
      >
        Login
      </Link>
      <Link2
	      to=""
	      onClick={handleAuthModalSignup}
	      className={cx(styles.baseBtn, {
		      [styles.baseInlineBtn]: inline,
		      [styles.registerBtn]: inline,
		      'inline-block': inline,
		      block: !inline,
	      })
	      }
	      key="2"
	      icon={<i className="mb3 fa fa-sign-up"/>}
      >
        Register
      </Link2>
    </If>
  </span>
);

MenuLinksDX.propTypes = {
	user: PropTypes.object,
	inline: PropTypes.bool,
	authCheck: PropTypes.bool,
	accountMenuIsOpen: PropTypes.bool,
};

export default MenuLinksDX;
