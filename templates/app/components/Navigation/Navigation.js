import React, {PropTypes} from 'react';
import cx from 'classnames';
import s from './Navigation.css';
import Link from '../Linkmaterial';


function Navigation({className}) {
    return (
        <div className={cx(s.root)} role="navigation">
            <Link className={cx(s.link)} to="About" hoverColor="#8AA62F" icon={<i className="mb3 fa fa-diamond" />}>About Skiscool</Link>
            <Link className={cx(s.link,className)} to="Contact">Contact</Link>
            <Link className={cx(s.link,className)} to="Root">Root</Link>
            <Link className={cx(s.link,className)} to="Profile">profile</Link>
            <span className={cx(s.spacer,className)}> | </span>
            <Link className={cx(s.link, s.highlight,className)} to="test">Test 404</Link>
        </div>
    );
}

Navigation.propTypes = {
    className: PropTypes.string,
};

export default Navigation;
