import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth state
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-section">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-menu">
              <a href="/" className="logo">
                <img
                  src="assets/images/476495700_492431837268688_724087271959669646_n.png"
                  alt="logo"
                />
              </a>
            </div>
            <div className="header-bar d-xl-none">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className="main-menu">
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/my-menu">My Menu </Link>
              </li>
              <li>
                <a href="#">Services </a>
              </li>
              {!user?.isAdmin ? (
                <li>
                  <a href="/realtimechat">Livechat Support </a>
                </li>
              ) : (
                <li>
                  <a href="/admin/chat">Support Customer </a>
                </li>
              )}
              <li>
                <a href="/food-logs">Your Diary</a>
              </li>
              <li>
                <a href="/voucher-shop">Voucher</a>
              </li>
              <li className="m-0 menu-btn ">
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
