import React from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const Product = ({ img, desc, price, id }) => {
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

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
  
  const handleProduct = (e, productId) => {
    e.stopPropagation()
    navigate(`/item/${productId}`);
  };

  const handleAddToCart = (e, id) => {
    e.stopPropagation()
    addItemToCart(id);
  };

  return (
    <div className="productWrap" onClick={(e) => handleProduct(e, id)}>
      <div className="imgWrap">
        <img src={img} alt="" />
      </div>
      <div className="infoWrap">
        <span>{desc}</span>
        <p>#{formatNumberWithCommas(price)}</p>
      </div>
      <button
        onClick={(e) => {
          handleAddToCart(e, id);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default Product;
