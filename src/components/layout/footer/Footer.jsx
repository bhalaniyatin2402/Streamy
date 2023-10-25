import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../../layout/contentWrapper/ContentWrapper";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer top-height">
      <ContentWrapper>
        <ul className="menu-items">
          <li className="menu-item">Terms Of Use</li>
          <li className="menu-item">Privacy-Policy</li>
          <li className="menu-item">About</li>
          <li className="menu-item">Blog</li>
          <li className="menu-item">FAQ</li>
        </ul>
        <div className="info-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
          dolorum corrupti delectus doloribus. Exercitationem consectetur ullam
          ducimus, culpa enim harum, asperiores molestiae delectus corrupti
          magnam itaque magni veritatis. Commodi, quidem!
        </div>
        <div className="social-icons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
}

export default Footer;
