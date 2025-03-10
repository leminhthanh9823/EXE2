import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Close the menu when the page is refreshed
    setMenuOpen(false);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropdownOpen(false); // Close the dropdown after logout
  };

  const handleProfile = () => {
    navigate("/profile");
    setDropdownOpen(false); // Close the dropdown when profile is clicked
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleSignUp = () => {
    navigate("/signup");
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="logo-menu">
            <a href="/" className="logo">
              <img style={{ width: "90px" }}
                src="https://i.postimg.cc/4NNvB9Wm/476495700-492431837268688-7240872719589669646-n.png"
                alt="logo"
              />
            </a>
          </div>

          {/* Toggle menu button for mobile */}
          <div
            className={`header-bar d-xl-none ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Main Menu */}
          <ul className={`main-menu ${menuOpen ? "open" : ""}`}>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/my-menu" onClick={() => setMenuOpen(false)}>
                Menu của tôi
              </Link>
            </li>
            {!user?.isAdmin ? (
              <li>
                <a href="/realtimechat" onClick={() => setMenuOpen(false)}>
                  Trò chuyện
                </a>
              </li>
            ) : (
              <li>
                <a href="/admin/chat" onClick={() => setMenuOpen(false)}>
                  Trò chuyện
                </a>
              </li>
            )}
            <li>
              <a href="/food-logs" onClick={() => setMenuOpen(false)}>
                Nhật Ký Của Tôi
              </a>
            </li>
            <li>
              <a href="/voucher-shop" onClick={() => setMenuOpen(false)}>
                Cửa Hàng Voucher
              </a>
            </li>
            <li className="m-0 menu-btn">
              {user ? (
                <div
                  className="user-avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={user.avatar || "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"} // If the user has an avatar, use it, otherwise use a default one
                    alt="User Avatar"
                    className="avatar-img"
                  />
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <button onClick={handleProfile} className="dropdown-item">
                        Profile
                      </button>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Signup
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
