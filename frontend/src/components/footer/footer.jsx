import { useState } from "react";
import "./footer.css";

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <footer
      className="footer footer-two pt-16 bg-image"
      data-background="assets/images/bg/footer-two-bg.jpg"
    >
      <div className="container">
        <div className="footer-two__wrp">
          <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 bg-secondary rounded-lg">
            {/* Logo & Social */}
            <div className="footer__item footer-two__item bg-primary h-full rounded-s-lg">
              <p className="bor-bottom pb-5 mb-5 hidden sm:block">
                Fit Menu – Nền tảng cung cấp thực đơn dinh dưỡng khoa học, giúp
                bạn ăn uống lành mạnh và cân bằng. Chọn gói menu phù hợp, nhận
                hướng dẫn chi tiết và bắt đầu hành trình sống khỏe ngay hôm nay!
                🚀🥗
              </p>
              <div className="social-icon">
                <a href="#0">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#0">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#0">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#0">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="footer__item footer-two__item">
              <div
                className="footer__item-title"
                onClick={() => toggleSection(2)}
              >
                <h4>Contact!</h4>
                {/* <span className="footer__item-title-line"></span> */}
                {/* <span className="footer__item-title-line2"></span> */}
              </div>
              <ul className={activeIndex === 2 ? "block" : "hidden sm:block"}>
                <li>
                  <a href="#0">Hòa Lạc, Thạch Thất, Hà Nội, Việt Nam</a>
                </li>
                <li>
                  <a href="tel:+84888038959">(+84) 888038959</a>
                </li>
                <li>
                  <a href="mailto:info@extrem.com">info@extrem.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__copyright footer-two__copyright">
        <p>
          &copy; 2025 <a href="#0">Fit Menu</a> All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
