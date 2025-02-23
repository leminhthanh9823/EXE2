import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore'; // Adjust the import path as needed
import './header.css';

export default function Header() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className='header'>
      <div className='header-section'>
        <div className='container'>
          <div className='header-wrapper'>
            <div className='logo-menu'>
              <a href='index.html' className='logo'>
                <img src='assets/images/logo.svg' alt='logo' />
              </a>
            </div>
            <div className='header-bar d-xl-none'>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className='main-menu'>
              <li>
                <a href='#'>Home </a>
              </li>
              <li>
                <a href='#'>About Us </a>
              </li>
              <li>
                <a href='#'>Services </a>
              </li>
              <li>
                <a href='#'>Blog </a>
              </li>
              <li>
                <a href='contact.html'>Contact Us</a>
              </li>
              <li className='m-0 menu-btn '>
                <a href='contact.html'>
                  <span>Get a quote</span>{' '}
                  <i className='fa-solid fa-angles-right'></i>
                </a>
              </li>
              <li>
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}