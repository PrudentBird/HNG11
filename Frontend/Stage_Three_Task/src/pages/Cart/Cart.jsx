import React, { useEffect, useState } from "react";
import "./Cart.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCart from "../../hooks/useCart";
import products from "../../data/products";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const {
    getCartItems,
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    clearCartItems,
  } = useCart();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  useEffect(() => {
    try {
      const cartItems = getCartItems();
      setCartItems(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, [getCartItems]);

  const getProductDetailsById = (id) => {
    return products.find((product) => product.id === id);
  };

  const handleQtnIncrease = (index) => {
    const productId = cartItems[index].productId;
    incrementItemQuantity(productId);
    const updatedCartItems = getCartItems();
    setCartItems(updatedCartItems);
  };

  const handleQtnDecrease = (index) => {
    const productId = cartItems[index].productId;
    decrementItemQuantity(productId);
    const updatedCartItems = getCartItems();
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (index) => {
    const productId = cartItems[index].productId;
    removeItemFromCart(productId);
    const updatedCartItems = getCartItems();
    setCartItems(updatedCartItems);
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

  const total = cartItems.reduce((acc, item) => {
    const productDetails = getProductDetailsById(item.productId);
    if (productDetails) {
      const price = parseFloat(productDetails.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return acc + price * quantity;
    }
    return acc;
  }, 0);

  const handleClear = () => {
    clearCartItems();
  }

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
                {cartItems.map((cartItem, index) => {
                  const productDetails = getProductDetailsById(
                    cartItem.productId
                  );

                  return (
                    <li key={cartItem.productId}>
                      <div className="cartMainWrap">
                        <div className="cartMain">
                          <div className="cartImg">
                            <img
                              src={productDetails?.img}
                              alt={productDetails?.desc}
                            />
                          </div>
                          <span>
                            <p>{productDetails?.desc}</p>
                            <button onClick={() => handleRemoveItem(index)}>
                              Remove
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="cartSide">
                        {isMobile ? (
                          ""
                        ) : (
                          <p>
                            #
                            {formatNumberWithCommas(
                              parseInt(productDetails?.price)
                            )}
                          </p>
                        )}
                        <div className="quantity">
                          <Minus onClick={() => handleQtnDecrease(index)} />
                          <span>{cartItem.quantity}</span>
                          <Plus onClick={() => handleQtnIncrease(index)} />
                        </div>
                        <p>
                          #
                          {formatNumberWithCommas(
                            parseInt(productDetails?.price) * cartItem.quantity
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="checkoutCta">
              <div>
                <span>Sub-total = #{formatNumberWithCommas(total)}</span>
                <p>Tax and shipping cost will be calculated later</p>
              </div>
              <span>

              <button className="trash" onClick={handleClear}><Trash2 /></button>

              <button className="checkout" onClick={handleCheckout}>Checkout</button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
