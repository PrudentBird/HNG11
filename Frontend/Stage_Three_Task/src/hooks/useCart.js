import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCart = () => {
  // Initialize cart state from local storage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Effect to update local storage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addItemToCart = (productId) => {
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
      toast.error("Item already in cart");
      return;
    }

    const updatedCart = [...cart, { productId, quantity: 1 }];
    setCart(updatedCart); // Update cart state
    toast.success("Item added to cart");
  };

  // Remove item from cart
  const removeItemFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart); // Update cart state
    console.log("After Removing Item:", updatedCart);
  };

  // Increment item quantity
  const incrementItemQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart); // Update cart state
    console.log("After Incrementing Quantity:", updatedCart);
  };

  // Decrement item quantity
  const decrementItemQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCart(updatedCart); // Update cart state
    console.log("After Decrementing Quantity:", updatedCart);
  };

  // Get item quantity
  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  // Get all cart items
  const getCartItems = () => {
    return cart;
  };

  // Get cart items count
  const cartItemsCount = cart.length;

  return {
    addItemToCart,
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    getItemQuantity,
    getCartItems,
    cartItemsCount,
  };
};

export default useCart;