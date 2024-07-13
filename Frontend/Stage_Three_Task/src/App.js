import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutProvider } from "./contexts/LayoutContext";
import AppLayout from "./layouts/AppLayout";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import ProductListing from "./pages/ProductListing/ProductListing";
import ProductInfo from "./pages/ProductInfo/ProductInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductListing />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/item/:id",
    element: <ProductInfo />,
  },
]);

function App() {
  return (
    <LayoutProvider value={AppLayout}>
      <RouterProvider router={router} />
    </LayoutProvider>
  );
}

export default App;
