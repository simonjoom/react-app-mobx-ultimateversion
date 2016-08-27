import dispatch from '~/temp/core/dispatch';
import cx from 'classnames';

// components
import Drawer from 'material-ui/Drawer';

// styles
import styles from './app.nav.css';

const handleOnRequestChange = (open) => {
    dispatch('ui.appNav.open', open);
};

const handleOnClick = () => {
    dispatch('ui.appNav.open', false);
};

const AppNav = ({children, open, docked, accountMenuIsOpen}) => (
    <Drawer
        className={cx({ [styles.drawer]: accountMenuIsOpen})}
        open={open}
        docked={docked}
        onRequestChange={handleOnRequestChange}
    >
        <div onClick={handleOnClick}>{children}</div>
    </Drawer>
);

AppNav.propTypes = {
    children: React.PropTypes.node,
    open: React.PropTypes.bool,
    docked: React.PropTypes.bool,
    accountMenuIsOpen: React.PropTypes.bool
};

export default AppNav;