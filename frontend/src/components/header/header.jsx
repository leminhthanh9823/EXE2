import React from 'react'
import './header.css'
export default function Header() {
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
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
