import './footer.css'
export default function Footer() {
  return (
    <footer
      className='footer footer-two pt-32 bg-image'
      data-background='assets/images/bg/footer-two-bg.jpg'
    >
      <div className='container'>
        <div className='footer-two__wrp'>
          <div className='grid grid-cols-4 bg-secondary rounded-lg'>
            <div
              className='wow fadeInUp'
              data-wow-duration='1.2s'
              data-wow-delay='.2s'
            >
              <div className='footer__item footer-two__item bg-primary h-full rounded-s-lg'>
                <a href='index.html' className='logo mb-7'>
                  <img src='assets/images/logo-light.svg' alt='logo' />
                </a>
                <p className='bor-bottom pb-5 mb-5'>
                  Tree planting is the act of planting young trees, shrubs, or
                  other woody plants into the ground to establish new
                </p>
                <div className='social-icon'>
                  <a href='#0'>
                    <i className='fa-brands fa-facebook-f'></i>
                  </a>
                  <a href='#0'>
                    <i className='fa-brands fa-twitter'></i>
                  </a>
                  <a href='#0'>
                    <i className='fa-brands fa-linkedin-in'></i>
                  </a>
                  <a href='#0'>
                    <i className='fa-brands fa-youtube'></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              className='wow fadeInUp'
              data-wow-duration='1.4s'
              data-wow-delay='.6s'
            >
              <div className='footer__item footer-two__item'>
                <div className='footer__item-title'>
                  <h4>Quick Link</h4>
                  <span className='footer__item-title-line'></span>
                  <span className='footer__item-title-line2'></span>
                </div>
                <ul>
                  <li className='pb-1'>
                    <a href='service-single.html'>
                      <i className='fa-solid fa-chevron-right pe-1 primary-color'></i>
                      Water Conservation
                    </a>
                  </li>
                  <li className='pb-1'>
                    <a href='service-single.html'>
                      <i className='fa-solid fa-chevron-right pe-1 primary-color'></i>
                      Eco System
                    </a>
                  </li>
                  <li className='pb-1'>
                    <a href='service-single.html'>
                      <i className='fa-solid fa-chevron-right pe-1 primary-color'></i>
                      Plastic Recycleing
                    </a>
                  </li>
                  <li className='pb-1'>
                    <a href='service-single.html'>
                      <i className='fa-solid fa-chevron-right pe-1 primary-color'></i>
                      Urban planning
                    </a>
                  </li>
                  <li>
                    <a href='service-single.html'>
                      <i className='fa-solid fa-chevron-right pe-1 primary-color'></i>{' '}
                      Save Green House
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className='wow fadeInUp'
              data-wow-duration='1.6s'
              data-wow-delay='.4s'
            >
              <div className='footer__item footer-two__item'>
                <div className='footer__item-title'>
                  <h4>Get in touch!</h4>
                  <span className='footer__item-title-line'></span>
                  <span className='footer__item-title-line2'></span>
                </div>
                <ul>
                  <li className='pb-3'>
                    <a href='#0'>
                      <i className='fa-solid fa-location-dot pe-1 primary-color'></i>
                      901 N Pitt Str., Suite 170 <br />
                      Alexandria, USA
                    </a>
                  </li>
                  <li className='pb-3'>
                    <a href='tel:+4065550120'>
                      <i className='fa-solid fa-phone-volume pe-1 primary-color'></i>
                      (406) 555-0120
                    </a>
                  </li>
                  <li>
                    <a href='#0'>
                      <i className='fa-solid fa-envelope pe-1 primary-color'></i>
                      info@extrem.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className='wow fadeInUp'
              data-wow-duration='1.8s'
              data-wow-delay='.8s'
            >
              <div className='footer__item footer-two__item'>
                <div className='footer__item-title'>
                  <h4>Subscribe Newsletter</h4>
                  <span className='footer__item-title-line'></span>
                  <span className='footer__item-title-line2'></span>
                </div>
                <p className='text-white'>
                  Subscribe to our newsletter for discounts and suffer in some
                  form
                </p>
                <div className='input-area mt-7 me-2'>
                  <input type='text' placeholder='Your Email' />
                  <button>
                    <i className='fa-sharp fa-solid fa-paper-plane'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer__copyright footer-two__copyright'>
        <p>
          &copy; Copyright 2023 <a href='#0'>foresty</a> All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
