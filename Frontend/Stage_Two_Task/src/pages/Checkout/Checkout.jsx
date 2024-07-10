import React, { useState } from "react";
import "./Checkout.scss";
import Nav from "../../components/Nav/Nav";
import {
  ChevronDown,
  CreditCard,
  MapPinned,
  Pencil,
  Truck,
  X,
} from "lucide-react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import { useMediaQuery } from "react-responsive";
const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shipmentOption, setShipmentOption] = useState(null);

  const handleShipmentOption = (option) => {
    setShipmentOption(option);
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

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
                  <div className="addressWrap">
                    <MdRadioButtonChecked />
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
                <div className="content">
                  <span>Summary</span>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
