import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutProvider } from "./contexts/LayoutContext";
import Checkout from "./pages/Checkout/Checkout";
import ProductListing from "./pages/ProductListing/ProductListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductListing />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/products",
    element: <ProductListing />,
  },
]);

function App() {
  return (
    <LayoutProvider>
      <RouterProvider router={router} />
    </LayoutProvider>
  );
}

export default App;