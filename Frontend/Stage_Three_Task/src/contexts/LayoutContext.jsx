import React, { createContext } from "react";
import AppLayout from "../layouts/AppLayout";
import { CartProvider } from "./CartContext";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  return (
    <LayoutContext.Provider value={AppLayout}>
      <CartProvider>
        <AppLayout>{children}</AppLayout>
      </CartProvider>
    </LayoutContext.Provider>
  );
};
