import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import Nav from "../../components/Nav/Nav";
import {
  ChevronDown,
  CircleCheckIcon,
  CreditCard,
  MapPinned,
  Pencil,
  Truck,
  X,
} from "lucide-react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import useCart from "../../hooks/useCart";
import products from "../../data/products";

const Checkout = () => {
  const navigate = useNavigate();
  const { getCartItems } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [shipmentOption, setShipmentOption] = useState(null);
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [address, setAddress] = useState(Boolean);
  const [billingAddress, setBillingAddress] = useState(Boolean);

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

  const handleShipmentOption = (option) => {
    setShipmentOption(option);
  };

  const isAddressValid = () => {
    return address;
  };

  const isShipmentOptionValid = () => {
    return shipmentOption !== null;
  };

  const isPaymentValid = () => {
    return (
      cardHolderName !== "" &&
      cardNumber.length !== "" &&
      cardExpiry.length !== "" &&
      cardCvv.length !== "" &&
      billingAddress === true
    );
  };

  const nextStep = () => {
    if (currentStep === 0) {
      if (isAddressValid()) {
        setCurrentStep(currentStep + 1);
      } else {
        alert("Please select an address.");
      }
    } else if (currentStep === 1) {
      if (isShipmentOptionValid()) {
        setCurrentStep(currentStep + 1);
      } else {
        alert("Please select a shipment option.");
      }
    } else if (currentStep === 2) {
      if (isPaymentValid()) {
        setCurrentStep(currentStep + 1);
      } else {
        alert("Please fill in all payment fields correctly.");
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  const formatCardNumber = (number) => {
    let digitsOnly = "";
    for (let i = 0; i < number.length; i++) {
      if (!isNaN(number[i]) && number[i] !== " ") {
        digitsOnly += number[i];
      }
    }
    digitsOnly = digitsOnly.slice(0, 16);

    let formattedNumber = "";
    for (let i = 0; i < digitsOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedNumber += " ";
      }
      formattedNumber += digitsOnly[i];
    }
    return formattedNumber;
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

  const subTotal = cartItems.reduce((acc, item) => {
    const productDetails = getProductDetailsById(item.productId);
    if (productDetails) {
      const price = parseFloat(productDetails.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return acc + price * quantity;
    }
    return acc;
  }, 0);

  const handlePayCta = () => {
    navigate("/");
  };

  const handleAddress = () => {
    setAddress(!address);
  };

  const handleBillingAddress = () => {
    setBillingAddress(!billingAddress);
  };

  return (
    <>
      <Nav />
      <div className="checkoutWrapp">
        <div className="checkoutWrapper">
          {currentStep === 0 ? (
            <div className="stepWrap">
              <ul className="header">
                <li className="active">
                  <MapPinned />
                  <div>
                    <p>Step 1</p>
                    <span>Address</span>
                  </div>
                </li>
                <li>
                  <Truck />
                  <div>
                    <p>Step 2</p>
                    <span>Shipping</span>
                  </div>
                </li>
                <li>
                  <CreditCard />
                  <div>
                    <p>Step 3</p>
                    <span>Payment</span>
                  </div>
                </li>
              </ul>
              <div className="contentWrap">
                <div className="content">
                  <span>Select Address</span>
                  <div className="addressWrap" onClick={handleAddress}>
                    <span>
                      {address ? (
                        <MdRadioButtonChecked />
                      ) : (
                        <MdRadioButtonUnchecked />
                      )}
                    </span>
                    <div className="addrWrap">
                      <div className="address">
                        <p>2118 Thornridge Cir. Syracuse, Connecticut 35624</p>
                        <p>(209) 555-0104</p>
                      </div>
                      <div className="functionWrap">
                        <span>HOME</span>
                        <div className="function">
                          <Pencil />
                          <X />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addAddressWrap">
                    <svg
                      width="100%"
                      height="auto"
                      viewBox="0 0 1120 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        y1="11.75"
                        x2="548"
                        y2="11.75"
                        stroke="url(#paint0_linear_60_4048)"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M556 12H564M560 8V16M570 12C570 17.5228 565.523 22 560 22C554.477 22 550 17.5228 550 12C550 6.47715 554.477 2 560 2C565.523 2 570 6.47715 570 12Z"
                        stroke="#001845"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="1120"
                        y1="12.25"
                        x2="572"
                        y2="12.25"
                        stroke="url(#paint1_linear_60_4048)"
                        strokeWidth="0.5"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_60_4048"
                          x1="555.117"
                          y1="12"
                          x2="0"
                          y2="12"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#001845" />
                          <stop offset="1" stopColor="#E6E6E6" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_60_4048"
                          x1="564.883"
                          y1="12"
                          x2="1120"
                          y2="12"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#001845" />
                          <stop offset="1" stopColor="#E6E6E6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>Add New Address</span>
                  </div>
                </div>
                <div className="stepsCta">
                  {currentStep === 0 ? (
                    ""
                  ) : (
                    <button className="back" onClick={prevStep}>
                      Back
                    </button>
                  )}
                  <button className="next" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {currentStep === 1 ? (
            <div className="stepWrap">
              <ul className="header">
                <li
                  className={
                    (!isMobile && currentStep === 0) || isMobile ? "active" : ""
                  }
                >
                  {currentStep === 1 && isMobile ? <Truck /> : <MapPinned />}
                  <div>
                    <p>{currentStep === 1 && isMobile ? "Step 2" : "Step 1"}</p>
                    <span>
                      {currentStep === 1 && isMobile ? "Shipping" : "Address"}
                    </span>
                  </div>
                </li>
                <li className={!isMobile && currentStep === 1 ? "active" : ""}>
                  {currentStep === 1 && isMobile ? <CreditCard /> : <Truck />}
                  <div>
                    <p>{currentStep === 1 && isMobile ? "Step 3" : "Step 2"}</p>
                    <span>
                      {currentStep === 1 && isMobile ? "Payment" : "Shipping"}
                    </span>
                  </div>
                </li>
                <li>
                  <CreditCard />
                  <div>
                    <p>Step 3</p>
                    <span>Payment</span>
                  </div>
                </li>
              </ul>
              <div className="contentWrap">
                <div className="content">
                  <span>Shipment Method</span>
                  <ul>
                    <li
                      className="shipmentWrapper"
                      onClick={() => handleShipmentOption("free")}
                    >
                      {shipmentOption === "free" ? (
                        <MdRadioButtonChecked />
                      ) : (
                        <MdRadioButtonUnchecked />
                      )}
                      <div
                        className={`shipmentWrap ${
                          shipmentOption === "free" ? "active" : ""
                        }`}
                      >
                        <div className="shipment">
                          <p>Free</p>
                          <p>Regular shipment</p>
                        </div>
                        <div className="shipmentDate">
                          <span>17th July, 2024</span>
                        </div>
                      </div>
                    </li>
                    <li
                      className="shipmentWrapper"
                      onClick={() => {
                        handleShipmentOption("fast");
                      }}
                    >
                      {shipmentOption === "fast" ? (
                        <MdRadioButtonChecked />
                      ) : (
                        <MdRadioButtonUnchecked />
                      )}
                      <div
                        className={`shipmentWrap ${
                          shipmentOption === "fast" ? "active" : ""
                        }`}
                      >
                        <div className="shipment">
                          <p>#5000</p>
                          <p>Fast track delivery</p>
                        </div>
                        <div className="shipmentDate">
                          <span>10th July, 2024</span>
                        </div>
                      </div>
                    </li>
                    <li
                      className="shipmentWrapper"
                      onClick={() => {
                        handleShipmentOption("schedule");
                      }}
                    >
                      {shipmentOption === "schedule" ? (
                        <MdRadioButtonChecked />
                      ) : (
                        <MdRadioButtonUnchecked />
                      )}
                      <div
                        className={`shipmentWrap ${
                          shipmentOption === "schedule" ? "active" : ""
                        }`}
                      >
                        <div className="shipment">
                          <p>Schedule</p>
                          <p>Pick a date when you want to get your delivery</p>
                        </div>
                        <div className="shipmentDate">
                          <div>
                            Select date
                            <span>
                              <ChevronDown />
                              <input type="date" name="" id="" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="stepsCta">
                  <button className="back" onClick={prevStep}>
                    Back
                  </button>
                  <button className="next" onClick={nextStep}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {currentStep === 2 ? (
            <div className="stepWrap">
              <ul className="header">
                <li
                  className={
                    (!isMobile && currentStep === 0) || isMobile ? "active" : ""
                  }
                >
                  {currentStep === 2 && isMobile ? (
                    <CreditCard />
                  ) : (
                    <MapPinned />
                  )}
                  <div>
                    <p>{currentStep === 2 && isMobile ? "Step 3" : "Step 1"}</p>
                    <span>
                      {currentStep === 2 && isMobile ? "Payment" : "Address"}
                    </span>
                  </div>
                </li>
                <li className={!isMobile && currentStep === 1 ? "active" : ""}>
                  {currentStep === 2 && isMobile ? "" : <Truck />}
                  <div>
                    <p>{currentStep === 2 && isMobile ? "" : "Step 2"}</p>
                    <span>
                      {currentStep === 2 && isMobile ? "" : "Shipping"}
                    </span>
                  </div>
                </li>
                <li className={!isMobile && currentStep === 2 ? "active" : ""}>
                  <CreditCard />
                  <div>
                    <p>Step 3</p>
                    <span>Payment</span>
                  </div>
                </li>
              </ul>
              <div className="contentWrap">
                <div className="summaryContentWrap">
                  <div className="summaryContent">
                    <span>Summary</span>
                    <ul>
                      {cartItems.map((cartItem) => {
                        const productDetails = getProductDetailsById(
                          cartItem.productId
                        );
                        return (
                          <li
                            className="summaryWrapper"
                            key={cartItem.productId}
                          >
                            <div className="productImg">
                              <img src={productDetails?.img} alt="" />
                            </div>
                            <div className="productInfo">
                              <span>{productDetails?.desc}</span>
                              <p>
                                #
                                {formatNumberWithCommas(
                                  productDetails?.price * cartItem.quantity
                                )}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="summaryAddrWrap">
                      <div className="summaryAddr">
                        <span>Address</span>
                        <p>1131 Random Street, Somewhereville, LG 40522</p>
                      </div>
                      <div className="summaryShipment">
                        <span>Shipment method</span>
                        <p>Free</p>
                      </div>
                      <div className="summaryPricing">
                        <span>
                          <p>Subtotal</p>
                          <p>#{formatNumberWithCommas(subTotal)}</p>
                        </span>
                        <div>
                          <span>
                            <p>Estimated Tax</p>
                            <p>#{cartItems.length > 0 ? 4000 : 0}</p>
                          </span>
                          <span>
                            <p>Estimated shipping & Handling</p>
                            <p>#{cartItems.length > 0 ? 10000 : 0}</p>
                          </span>
                        </div>
                        <span className="total">
                          <p>Total</p>
                          <p>
                            #
                            {formatNumberWithCommas(
                              cartItems.length > 0 ? subTotal + 14000 : 0
                            )}
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="paymentWrap">
                    <div className="paymentHeaderWrap">
                      <span>Payment</span>
                      <ul className="paymentHeader">
                        <li>Credit Card</li>
                        <li>PayPal</li>
                        <li>PayPal Credit</li>
                      </ul>
                    </div>
                    <div className="creditCard">
                      <div className="creditCardHeader">
                        <div className="chip">
                          <svg
                            width="42"
                            height="31"
                            viewBox="0 0 42 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5 0.666992H12.832V9.89746L0 9.89746V5.66699C0 2.90557 2.23858 0.666992 5 0.666992ZM0 12.2052H12.832V19.1289H0V12.2052ZM0 21.4366V25.667C0 28.4284 2.23858 30.667 5 30.667H12.832V21.4366H0ZM26.832 30.667H15.1654V0.666992H37C39.7614 0.666992 42 2.90557 42 5.66699V9.89746L29.1654 9.89746L27.418 9.89746L26.832 9.89746V30.667ZM29.1654 12.2052H42V19.1289H29.1654V12.2052ZM29.1654 21.4366V30.667H37C39.7614 30.667 42 28.4284 42 25.667V21.4366H29.1654Z"
                              fill="#DFDEDE"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5 0.666992H12.832V9.89746L0 9.89746V5.66699C0 2.90557 2.23858 0.666992 5 0.666992ZM0 12.2052H12.832V19.1289H0V12.2052ZM0 21.4366V25.667C0 28.4284 2.23858 30.667 5 30.667H12.832V21.4366H0ZM26.832 30.667H15.1654V0.666992H37C39.7614 0.666992 42 2.90557 42 5.66699V9.89746L29.1654 9.89746L27.418 9.89746L26.832 9.89746V30.667ZM29.1654 12.2052H42V19.1289H29.1654V12.2052ZM29.1654 21.4366V30.667H37C39.7614 30.667 42 28.4284 42 25.667V21.4366H29.1654Z"
                              fill="url(#paint0_linear_61_4577)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_61_4577"
                                x1="21"
                                y1="0.666992"
                                x2="21"
                                y2="30.667"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop
                                  offset="1"
                                  stopColor="white"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div className="visa">
                          <svg
                            width="76"
                            height="25"
                            viewBox="0 0 76 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M32.7869 23.736H26.7046L30.5089 0.422678H36.5909L32.7869 23.736Z"
                              fill="white"
                            />
                            <path
                              d="M54.8356 0.992601C53.6359 0.520889 51.7331 6.10352e-05 49.3803 6.10352e-05C43.3738 6.10352e-05 39.1441 3.17447 39.1182 7.71293C39.0683 11.0614 42.1465 12.9212 44.4488 14.0377C46.8019 15.1786 47.6018 15.9232 47.6018 16.9401C47.5779 18.502 45.7004 19.2219 43.9492 19.2219C41.5209 19.2219 40.2198 18.8507 38.2424 17.9818L37.4415 17.6093L36.5904 22.8426C38.0169 23.4868 40.6452 24.0583 43.3738 24.0834C49.7558 24.0834 53.9106 20.9581 53.9598 16.1217C53.9841 13.4677 52.3587 11.4342 48.8544 9.7725C46.7271 8.7058 45.4243 7.98653 45.4243 6.8951C45.4492 5.90289 46.5262 4.88661 48.9276 4.88661C50.9049 4.83684 52.3577 5.30789 53.4583 5.77927L54.0084 6.02683L54.8356 0.992601Z"
                              fill="white"
                            />
                            <path
                              d="M62.9196 15.4769C63.4205 14.1376 65.348 8.95403 65.348 8.95403C65.3227 9.00381 65.8479 7.58999 66.1482 6.72206L66.5733 8.73087C66.5733 8.73087 67.7251 14.3113 67.9752 15.4769C67.0246 15.4769 64.121 15.4769 62.9196 15.4769ZM70.4275 0.422678H65.7228C64.272 0.422678 63.1698 0.843955 62.5438 2.35699L53.5094 23.7357H59.8913C59.8913 23.7357 60.942 20.8582 61.1678 20.2385C61.868 20.2385 68.0763 20.2385 68.977 20.2385C69.1516 21.057 69.7027 23.7357 69.7027 23.7357H75.3343L70.4275 0.422678Z"
                              fill="white"
                            />
                            <path
                              d="M21.623 0.422882L15.6665 16.3203L15.0156 13.0961C13.9143 9.37585 10.4606 5.33383 6.60642 3.32403L12.0624 23.7115H18.4943L28.0545 0.422882H21.623Z"
                              fill="white"
                            />
                            <path
                              d="M10.1369 0.422323H0.351089L0.250977 0.893375C7.8845 2.82802 12.94 7.49141 15.0171 13.0966L12.8898 2.38202C12.5396 0.893046 11.4633 0.471439 10.1369 0.422323Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="creditCardInfo">
                        <span>
                          {cardNumber === ""
                            ? "1234 5678 9123 4567"
                            : formatCardNumber(cardNumber)}
                        </span>
                        <div>
                          <span>
                            {cardHolderName === "" ? "TOLU .L" : cardHolderName}
                          </span>
                          <span>
                            {cardExpiry === "" ? "00/00" : cardExpiry}
                          </span>
                        </div>
                      </div>
                    </div>
                    <form action="" id="paymentForm" name="paymentForm">
                      <div className="inputWrap">
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          onChange={(e) => setCardHolderName(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={formatCardNumber(cardNumber)}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <span>
                          <input
                            type="text"
                            placeholder="Exp. Date"
                            value={cardExpiry}
                            onChange={(e) => {
                              let value = e.target.value;
                              let filteredValue = "";
                              for (let i = 0; i < value.length; i++) {
                                if (
                                  (value[i] >= "0" && value[i] <= "9") ||
                                  value[i] === "/"
                                ) {
                                  filteredValue += value[i];
                                }
                              }

                              value = filteredValue;
                              if (value.length === 2) {
                                if (
                                  cardExpiry.length === 3 &&
                                  value[2] !== "/"
                                ) {
                                  value = value[0] + value[1];
                                } else if (value[1] !== "/") {
                                  value += "/";
                                }
                              }
                              if (value.length <= 5) {
                                setCardExpiry(value);
                              } else {
                                setCardExpiry(cardExpiry);
                              }
                            }}
                          />
                          <input
                            type="number"
                            value={cardCvv}
                            placeholder="CVV"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value.length <= 3) {
                                setCardCvv(value);
                              } else {
                                setCardCvv(cardCvv);
                              }
                            }}
                          />
                        </span>
                      </div>
                      <span onClick={handleBillingAddress}>
                        {billingAddress ? (
                          <MdCheckBox />
                        ) : (
                          <MdCheckBoxOutlineBlank />
                        )}
                        <p>Same as billing address</p>
                      </span>
                    </form>
                  </div>
                </div>
                <div className="stepsCta">
                  <button className="back" onClick={prevStep}>
                    Back
                  </button>
                  <button className="next" onClick={nextStep}>
                    {currentStep === 2 ? "Pay" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {currentStep === 3 ? (
            <div className="stepWrap">
              <ul className="header">
                <li
                  className={
                    (!isMobile && currentStep === 0) || isMobile ? "active" : ""
                  }
                >
                  {currentStep === 3 && isMobile ? (
                    <CreditCard />
                  ) : (
                    <MapPinned />
                  )}
                  <div>
                    <p>{currentStep === 3 && isMobile ? "Step 3" : "Step 1"}</p>
                    <span>
                      {currentStep === 3 && isMobile ? "Payment" : "Address"}
                    </span>
                  </div>
                </li>
                <li className={!isMobile && currentStep === 1 ? "active" : ""}>
                  {currentStep === 3 && isMobile ? "" : <Truck />}
                  <div>
                    <p>{currentStep === 3 && isMobile ? "" : "Step 2"}</p>
                    <span>
                      {currentStep === 3 && isMobile ? "" : "Shipping"}
                    </span>
                  </div>
                </li>
                <li className={!isMobile && currentStep === 3 ? "active" : ""}>
                  <CreditCard />
                  <div>
                    <p>Step 3</p>
                    <span>Payment</span>
                  </div>
                </li>
              </ul>
              <div className="contentWrap">
                <div className="verifyWrap">
                  <div className="verifyContent">
                    <CircleCheckIcon />
                    <div>
                      <span>Payment Confirmed</span>
                      <p>ORDER #2039</p>
                    </div>
                    <p>
                      Thank you for buying from Gadgetry. Now that your order is
                      confirmed it will be ready to ship in 7 working days.
                      Please check your inbox in the future for your order
                      updates.
                    </p>
                    <button onClick={handlePayCta}>Back to shopping</button>
                    <span className="receipt">Print receipt</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
