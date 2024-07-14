import React, { useEffect, useState } from "react";
import "./ProductListing.scss";
import Nav from "../../components/Nav/Nav";
import { ChevronLeft, ChevronRight, Search, Settings2 } from "lucide-react";
import Product from "../../components/Product/Product";
import products from "../../data/products";
import categories from "../../data/categories";
import Footer from "../../components/Footer/Footer";

const filters = ["By lowest price", "By highest price"];

const ProductListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const productsPerPage = 12;
  const totalPages = Math.ceil(products?.length / productsPerPage);
  
  
  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


    setCurrentProducts(
      products?.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              </div>
              <div className="searchWrap">
                <Search />
                <input type="search" name="" id="" placeholder="Search" />
              </div>
              <div className="checkBoxWrap">
                {categories.map((item, index) => (
                  <label key={index}>
                    <input type="checkbox" name="brand" value={item.name} />
                    <div>
                      <span>{item.name}</span>
                      <span>{}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="productsContent">
              <div className="header">
                <div>
                  Products found: <span>{products.length}</span>
                </div>
                <div className="options">
                  <button className="quickFilter">
                    Filters
                    <Settings2 />
                  </button>
                  <div>
                    <select name="quickFilter" id="">
                      {filters.map((filter, index) => (
                        <option key={index} value={filter}>
                          {filter}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="productsWrapper">
                {currentProducts.map((product, index) => (
                  <Product
                    img={product.img}
                    desc={product.desc}
                    price={product.price}
                    id={product.id}
                    key={index}
                  />
                ))}
              </div>
              <div className="footer">
                <ChevronLeft onClick={handlePreviousPage} />
                {Array.from({ length: totalPages }, (_, i) => (
                  <div
                    key={i + 1}
                    className={`page ${currentPage === i + 1 ? "activePage" : ""}`}
                    onClick={() => handlePageClick(i + 1)}
                  >
                    {i + 1}
                  </div>
                ))}
                <ChevronRight onClick={handleNextPage} />
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
