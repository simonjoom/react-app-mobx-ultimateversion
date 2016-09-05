import React, { PropTypes } from 'react';
import cx from 'classnames';
import Navigation from '../Navigation';


const MenuLinksSX = ({ inline }) => {
  const btnBlock = cx('btn', 'block', 'py2', 'm0');
  const btnInline = cx('btn', 'inline-block', 'py2', 'm0');
  return (
    <span>
      <Navigation className={inline ? btnInline : btnBlock} />
    </span>
  );
};

MenuLinksSX.propTypes = {
  inline: PropTypes.bool,
};

export default MenuLinksSX;
