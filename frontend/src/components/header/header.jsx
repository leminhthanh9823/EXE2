import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMarch8, setShowMarch8] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    const today = new Date();
    if (today.getMonth() === 2 ) {
      setShowMarch8(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropdownOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setDropdownOpen(false);
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
        {showMarch8 && (
          <div className="flower-fall">
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
            <div className="flower"></div>
          </div>
        )}

        <div className="header-wrapper">
          <div className="logo-menu">
            <a href="/" className="logo">
              <img
                style={{ width: "90px" }}
                src="https://i.postimg.cc/4NNvB9Wm/476495700-492431837268688-7240872719589669646-n.png"
                alt="logo"
              />
            </a>
            {/* Đặt header-bar cùng dòng với logo */}
            <div
              className={`header-bar d-xl-none ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {showMarch8 && (
            <div className="march8-section">
              <h1 className="march8-greeting">Chúc mừng ngày 8/3</h1>
            </div>
          )}

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
                    src={
                      user.avatar ||
                      "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                    }
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
