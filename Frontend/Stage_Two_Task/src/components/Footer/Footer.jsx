import React from "react";
import "./Footer.scss";
import Logo from "../../assets/LogoWhite.png";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerWrapp">
      <div className="footerWrapped">
        <footer>
          <div className="footerWrap">
            <Link to='/' className="logoWrap">
              <div>
                <img src={Logo} alt="" />
              </div>
              <span>
                We are Nigeria's finest gadget hub, where comfort,<br />quality and
                affordability meets world.
              </span>
            </Link>
            <div className="footerNavWrap">
              <ul className="footerNav">
                <p>Services</p>
                <div>
                  <li>Gift cards</li>
                  <li>Credit and payment</li>
                  <li>Service contracts</li>
                  <li>Non-cash account</li>
                </div>
              </ul>
              <ul className="footerNav">
                <p>Customer Care</p>
                <div>
                  <li>Find an order</li>
                  <li>Terms of delivery</li>
                  <li>Return policy</li>
                  <li>Guarantee</li>
                  <li>Frequently asked questions</li>
                  <li>Terms and conditions</li>
                </div>
              </ul>
            </div>
          </div>
          <ul className="socialsWrap">
            <li>
              <Twitter />
            </li>
            <li>
              <Facebook />
            </li>
            <li>
              <FaTiktok />
            </li>
            <li>
              <Instagram />
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
