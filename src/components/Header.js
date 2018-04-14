import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <Link to="/" className="navbar-brand">
            My Shopping Page
          </Link>
          <ul className="nav navbar-nav">
            <li className="nav-item">
            <Link to="/cartView" className="nav-link">
                Shop and Cart
            </Link>
            </li>

            <li className="nav-item">
            <Link to="/mysection" className="nav-link">
                Admin
            </Link>
            </li>

            </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
