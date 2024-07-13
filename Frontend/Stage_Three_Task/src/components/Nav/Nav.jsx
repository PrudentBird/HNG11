import React from "react";
import "./Nav.scss";
import Logo from "../../assets/Logo.png";
import { ShoppingBag, CircleUserRound, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";

const Nav = () => {
  const navigate = useNavigate();
  const { cartItemsCount } = useCartContext();

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <div className="navWrapp">
      <div className="navWrapped">
        <nav>
          <Link to="/" className="logoWrap">
            <img src={Logo} alt="" />
          </Link>
          <div className="navWrap">
            <div className="inputWrap">
              <Search />
              <input type="search" name="" id="" placeholder="Search" />
            </div>
            <ul className="ctaLinks">
              <li className="ctaLink" onClick={handleCart}>
                <ShoppingBag />
                <span>{cartItemsCount}</span>
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
