import React from 'react';
import Link from '../Link';

const Navigation = () => (
  <nav>
    <Link to="MySite">
      Concept MySite
    </Link>
    <Link to="About">
      About MySite
    </Link>
    <Link to="Root">
      Root
    </Link>
  </nav>
);
export default Navigation;
