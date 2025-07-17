// src/components/ClientAccess.jsx
import { useState } from 'react';
import axios from 'axios';
import './ClientAccess.css'; // optional for styling

export default function ClientAccess() {
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, registerData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'client');
      window.location.href = '/client';
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      if (res.data.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/client';
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="access-container">
      <form className="access-form" onSubmit={handleRegisterSubmit}>
        <h2>Register</h2>
        <input name="name" value={registerData.name} onChange={handleRegisterChange} placeholder="Name" required />
        <input name="email" type="email" value={registerData.email} onChange={handleRegisterChange} placeholder="Email" required />
        <input name="password" type="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>

      <form className="access-form" onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
        <input name="email" type="email" value={loginData.email} onChange={handleLoginChange} placeholder="Email" required />
        <input name="password" type="password" value={loginData.password} onChange={handleLoginChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
