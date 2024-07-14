import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = ({ children }) => {
  return (
    <>
      {children}
      <Outlet />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default AppLayout;