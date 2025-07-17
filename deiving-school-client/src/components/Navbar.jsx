// src/components/Navbar.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: 'transparent',
        position: 'absolute',
        width: '100%',
        top: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand fw-bold fs-3" href="#" style={{ color: '#FFD369' }}>
          🚗 Master Driving School
        </a>
        <div>
          <a className="btn btn-outline-light me-3" href="#">About</a>
          <a className="btn btn-warning" href="#">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
