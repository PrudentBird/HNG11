import React from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const Product = ({ img, desc, price, id }) => {
  const navigate = useNavigate();
  const { addItemToCart } = useCart();

  const handleProduct = (productId) => {
    navigate(`/item/${productId}`);
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

  const handleAddToCart = (id) => {
    addItemToCart(id);
  };

  return (
    <div className="productWrap" onClick={() => handleProduct(id)}>
      <div className="imgWrap">
        <img src={img} alt="" />
      </div>
      <div className="infoWrap">
        <span>{desc}</span>
        <p>#{formatNumberWithCommas(price)}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(id);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default Product;
