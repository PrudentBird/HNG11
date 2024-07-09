import React from "react";
import "./Nav.scss";
import Logo from "../../assets/Logo.png";
import { ShoppingBag, CircleUserRound, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="navWrapp">
      <div className="navWrapped">
        <nav>
          <div className="logoWrap">
            <img src={Logo} alt="" />
          </div>
          <div className="navWrap">
            <div className="inputWrap">
              <Search />
              <input type="search" name="" id="" placeholder="Search" />
            </div>
            <ul className="ctaLinks">
              <li className="ctaLink" onClick={handleCheckout}>
                <ShoppingBag />
                <span></span>
              </li>
              <li className="ctaLink">
                <CircleUserRound />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
