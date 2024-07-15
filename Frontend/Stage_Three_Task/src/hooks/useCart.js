import { toast } from "react-toastify";

const useCart = () => {
  const getCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addItemToCart = (productId) => {
    const cart = getCartFromLocalStorage();

    const existingItemIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      toast.error("Item already in cart");
      return;
    }

    const updatedCart = [...cart, { productId, quantity: 1 }];
    saveCartToLocalStorage(updatedCart);
    toast.success("Item added to cart");
  };

  const removeItemFromCart = (productId) => {
    const cart = getCartFromLocalStorage();
    console.log("Before Removing Item:", cart);

    const updatedCart = cart.filter((item) => item.productId !== productId);

    saveCartToLocalStorage(updatedCart);
    console.log("After Removing Item:", updatedCart);
  };

  const incrementItemQuantity = (productId) => {
    const cart = getCartFromLocalStorage();
    console.log("Before Incrementing Quantity:", cart);

    const existingItemIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    const updatedCart = cart.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    saveCartToLocalStorage(updatedCart);
    console.log("After Incrementing Quantity:", updatedCart);
  };

  const decrementItemQuantity = (productId) => {
    const cart = getCartFromLocalStorage();
    console.log("Before Decrementing Quantity:", cart);

    const existingItemIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    const updatedCart = cart.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );

    saveCartToLocalStorage(updatedCart);
    console.log("After Decrementing Quantity:", updatedCart);
  };

  const getItemQuantity = (productId) => {
    const cart = getCartFromLocalStorage();
    const item = cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const getCartItems = () => {
    return getCartFromLocalStorage();
  };

  const clearCartItems = () => {
    saveCartToLocalStorage([]);
    toast.success("Cart cleared successfully");
  };


  return {
    addItemToCart,
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    getItemQuantity,
    getCartItems,
    clearCartItems,
  };
};

export default useCart;
