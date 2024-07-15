import React, { useEffect, useState } from "react";
import "./ProductListing.scss";
import Nav from "../../components/Nav/Nav";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Settings2,
  ChevronDown,
} from "lucide-react";
import Product from "../../components/Product/Product";
import products from "../../data/products";
import categories from "../../data/categories";
import Footer from "../../components/Footer/Footer";

const filters = ["By lowest price", "By highest price"];

const ProductListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const productsPerPage = 12;
  const totalPages = Math.ceil(products?.length / productsPerPage);

  useEffect(() => {
    setCategorizedProducts(categorizeProducts(products, categories));
  }, []);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    let filteredProducts = products;
    if (selectedCategories.length > 0) {
      console.log(categorizedProducts);
      console.log(selectedCategories);
      filteredProducts = selectedCategories
        .flatMap((category) => categorizedProducts[category] || [])
        .map((productId) =>
          products.find((product) => product.id === productId)
        );
    }

    if (selectedFilter === "By lowest price") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === "By highest price") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setCurrentProducts(
      filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  }, [currentPage, selectedCategories, categorizedProducts, selectedFilter]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryName)) {
        return prevSelectedCategories.filter((name) => name !== categoryName);
      } else {
        return [...prevSelectedCategories, categoryName];
      }
    });
    setCurrentPage(1);
  };

  const categorizeProducts = (products, categories) => {
    const categorizedProducts = {};

    categories.forEach((category) => {
      const matchedProducts = products.filter(
        (product) => product.categoryId === category.id
      );
      const productIds = matchedProducts.map((product) => product.id);
      categorizedProducts[category.name] = productIds;
    });

    return categorizedProducts;
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
                    <input
                      type="checkbox"
                      name="brand"
                      value={item.name}
                      onChange={() => handleCategoryClick(item.name)}
                    />
                    <div>
                      <span>{item.name}</span>
                      <span>{categorizedProducts[item.name]?.length || 0}</span>
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
                  Products found:
                  <span>
                    {selectedCategories.length === 0
                      ? products.length
                      : (() => {
                          const productIds = new Set();
                          selectedCategories.forEach((categoryName) => {
                            const ids = categorizedProducts[categoryName] || [];
                            ids.forEach((id) => productIds.add(id));
                          });
                          return productIds.size;
                        })()}
                  </span>
                </div>
                <div className="options">
                  <button className="quickFilter">
                    Filters
                    <Settings2 />
                  </button>
                  <div>
                    <select
                      name="quickFilter"
                      id=""
                      value={selectedFilter}
                      onChange={handleFilterChange}
                    >
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
                    className={`page ${
                      currentPage === i + 1 ? "activePage" : ""
                    }`}
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
