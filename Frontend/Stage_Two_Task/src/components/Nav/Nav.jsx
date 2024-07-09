import React from "react";
import "./Nav.scss";
import Logo from "../../assets/Logo.png";
import { ShoppingBag, Heart, CircleUserRound, Search } from "lucide-react";

const Nav = () => {
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
            <li className="ctaLink">
              <ShoppingBag />
              <span></span>
            </li>
            <li className="ctaLink">
              <Heart />
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
