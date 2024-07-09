import React from "react";
import "./ProductListing.scss";
import Nav from "../../components/Nav/Nav";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
} from "lucide-react";
import Product from "../../components/Product/Product";
import products from "../../data/products";
import Footer from "../../components/Footer/Footer";

const phones = [
  { brand: "Apple", quantity: 110 },
  { brand: "Samsung", quantity: 125 },
  { brand: "Xiaomi", quantity: 68 },
  { brand: "Poco", quantity: 44 },
  { brand: "OPPO", quantity: 36 },
  { brand: "Honor", quantity: 10 },
  { brand: "Motorola", quantity: 34 },
  { brand: "Nokia", quantity: 22 },
  { brand: "Realme", quantity: 35 },
];

const filters = [
  "By rating",
  "By lowest price",
  "By highest price",
  "By most popular",
];

const ProductListing = () => {
  return (
    <>
      <Nav />
      <div className="productsWrapp">
        <div className="productsWrap">
          <div className="breadcrumbsWrap">
            <span>Home</span>
            <ChevronRight />
            <span>Catalog</span>
            <ChevronRight />
            <span className="active">Smartphones</span>
          </div>
          <div className="productsContentWrap">
            <div className="filtersWrap">
              <div className="header">
                <span>Brand</span>
                <ChevronUp />
              </div>
              <div className="searchWrap">
                <Search />
                <input type="search" name="" id="" placeholder="Search" />
              </div>
              <div className="checkBoxWrap">
                {phones.map((phone) => (
                  <label>
                    <input type="checkbox" name="phones" value={phone.brand} />
                    <div>
                      <span>{phone.brand}</span>
                      <span>{phone.quantity}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="header">
                <span>Battery capacity</span>
                <ChevronDown />
              </div>
              <div className="header">
                <span>Screen type</span>
                <ChevronDown />
              </div>
              <div className="header">
                <span>Screen diagonal</span>
                <ChevronDown />
              </div>
              <div className="header">
                <span>Protection class</span>
                <ChevronDown />
              </div>
              <div className="header">
                <span>Built-in memory</span>
                <ChevronDown />
              </div>
            </div>

            <div className="productsContent">
              <div className="header">
                <div>
                  Selected Products: <span>146</span>
                </div>
                <select name="quickFilter" id="">
                  {filters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
              </div>
              <div className="productsWrapper">
                {products.map((product) => (
                  <Product
                    img={product.img}
                    desc={product.desc}
                    price={product.price}
                  />
                ))}
              </div>
              <div className="footer">
                <ChevronLeft />
                <div className="page first">1</div>
                <div className="page">2</div>
                <div className="page">3</div>
                <span>....</span>
                <div className="page">12</div>
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductListing;
