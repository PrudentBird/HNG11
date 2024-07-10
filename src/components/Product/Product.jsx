import React from "react";
import "./Product.scss";
import { toast } from "react-toastify";

const Product = ({ img, desc, price }) => {
  const handleAddToCart = () => {
    toast.success("Item added to cart!");
  };
  return (
    <div className="productWrap">
      <div className="imgWrap">
        <img src={img} alt="" />
      </div>
      <div className="productInfo">
        <span>{desc}</span>
        <p>{price}</p>
      </div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default Product;
