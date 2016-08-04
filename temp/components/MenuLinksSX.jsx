import dispatch from '~/temp/core/dispatch';
import cx from 'classnames';
import Link from './Link';
import Navigation from './Navigation';


function MenuLinksSX(inline) {
    const btnBlock = cx('btn', 'block', 'py2', 'm0');
    const btnInline = cx('btn', 'inline-block','py2','m0');
    return (
        <span>
  <Navigation className={inline ? btnInline : btnBlock}/>
  </span>
    );
}

MenuLinksSX.propTypes = {
    inline: React.PropTypes.bool
};

export default MenuLinksSX;
