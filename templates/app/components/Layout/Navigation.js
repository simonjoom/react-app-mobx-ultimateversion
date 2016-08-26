import Link from '../Link';

function Navigation() {
  return (
    <nav>
      <Link to="Skiscool">
        About
      </Link>
      <Link to="GetStarted">
        Get Started
      </Link>
      <Link to="Root">
        Root
      </Link>
    </nav>
  );
}

export default Navigation;
