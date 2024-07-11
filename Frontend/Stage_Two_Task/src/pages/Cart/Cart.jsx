import React, { useState } from "react";
import "./Cart.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useMediaQuery } from "react-responsive";
import cart from "../../data/cart";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  const [itemQuantity, setItemQuantity] = useState(
    cart.reduce((acc, item, index) => {
      acc[index] = 1;
      return acc;
    }, {})
  );
  const handleQtnIncrease = (index) => {
    setItemQuantity((prevQuantity) => ({
      ...prevQuantity,
      [index]: prevQuantity[index] + 1,
    }));
  };

  const handleQtnDecrease = (index) => {
    setItemQuantity((prevQuantity) => ({
      ...prevQuantity,
      [index]: Math.max(prevQuantity[index] - 1, 1),
    }));
  };

  const formatNumberWithCommas = (number) => {
    const numberString = number.toString();

    const [integerPart, decimalPart] = numberString.split(".");

    let withCommas = "";
    for (let i = 0; i < integerPart.length; i++) {
      if (i > 0 && (integerPart.length - i) % 3 === 0) {
        withCommas += ",";
      }
      withCommas += integerPart[i];
    }

    return decimalPart ? `${withCommas}.${decimalPart}` : withCommas;
  };

  const total = cart.reduce((acc, cartItem, index) => {
    return acc + cartItem.price * itemQuantity[index];
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <>
      <Nav />
      <div className="cartWrapper">
        <div className="cartWrap">
          <div className="header">
            <span>Your cart items</span>
            <Link to="/" className="cta">
              Back to shopping
            </Link>
          </div>
          <div className="contentWrap">
            <div className="content">
              <div className="heading">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              <ul>
                {cart.map((cartItem, index) => (
                  <li key={index}>
                    <div className="cartMainWrap">
                      <div className="cartMain">
                        <div className="cartImg">
                          <img src={cartItem.img} alt="" />
                        </div>
                        <span>
                          <p>{cartItem.desc}</p>
                          <button>Remove</button>
                        </span>
                      </div>
                    </div>
                    <div className="cartSide">
                      {isMobile ? (
                        ""
                      ) : (
                        <p>#{formatNumberWithCommas(cartItem.price)}</p>
                      )}
                      <div className="quantity">
                        <Minus onClick={() => handleQtnDecrease(index)} />
                        <span>{itemQuantity[index]}</span>
                        <Plus onClick={() => handleQtnIncrease(index)} />
                      </div>
                      <p>
                        #
                        {formatNumberWithCommas(
                          cartItem.price * itemQuantity[index]
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="checkoutCta">
              <div>
                <span>Sub-total = #{formatNumberWithCommas(total)}</span>
                <p>Tax and shipping cost will be calculated later</p>
              </div>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
