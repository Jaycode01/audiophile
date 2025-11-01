import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <section className="footer_wrapper">
      <footer>
        <div className="row_one">
          <img src="/assets/audiophile.svg" alt="audiophile logo" />
          <ul className="navigation">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Headphones</a>
            </li>
            <li>
              <a href="#">Speakers</a>
            </li>
            <li>
              <a href="#">Earphones</a>
            </li>
          </ul>
        </div>
        <div className="row_two">
          <p className="outro_text">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
          <div className="socials">
            <FaFacebookSquare className="social" />
            <FaTwitter className="social" />
            <FaInstagram className="social" />
          </div>
        </div>
        <div className="row_three">
          <p className="copyright">Copyright 2021. All Rights Reserved.</p>
          <div className="socials">
            <FaFacebookSquare className="social" />
            <FaTwitter className="social" />
            <FaInstagram className="social" />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
