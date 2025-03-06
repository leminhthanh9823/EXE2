import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function AdminHeader() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Đóng menu khi tải lại trang
    setMenuOpen(false);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false); // Đóng menu sau khi logout
  };

  return (
    <header className="header">
      <div className="">
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

            {/* Nút mở menu trên điện thoại */}
            <div
              className={`header-bar d-xl-none ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Menu chính */}
            <ul className={`main-menu ${menuOpen ? "open" : ""}`}>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin/menus" onClick={() => setMenuOpen(false)}>
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/admin/meals" onClick={() => setMenuOpen(false)}>
                  Meal
                </Link>
              </li>
              <li>
                <Link to="/admin/chat" onClick={() => setMenuOpen(false)}>
                  Chat
                </Link>
              </li>

              <li className="m-0 menu-btn">
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
