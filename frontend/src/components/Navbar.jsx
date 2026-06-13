import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          💼 WXT
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/portfolio" className="nav-link">Carteira</Link>
          </li>
          <li className="nav-item">
            <Link to="/trading" className="nav-link">Trading</Link>
          </li>
          {user?.role === 'admin' && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link admin-link">⚙️ Admin</Link>
            </li>
          )}
        </ul>

        <div className="nav-right">
          <span className="user-name">{user?.fullName}</span>
          <button onClick={handleLogout} className="logout-btn">Sair</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
