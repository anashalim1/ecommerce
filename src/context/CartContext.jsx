import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { AuthContext } from "./AuthContext";
export const CartContext = createContext(null);

// here i have the cart context that handels all the cart logic and operations
export default function CartContextProvider({ children }) {
  const [cartDetails, setCartDetails] = useState(null);
  const API_URL = "https://ecommerce.routemisr.com/api/v1/cart";
  const { authToken ,ownerId } = useContext(AuthContext);
  const [numberOfCartItems, setnumberOfCartItems] = useState(0);
  const [cartId, setcartId] = useState(null);
  // const [ownerId, setOwnerId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allOrdersData, setallOrdersData] = useState([]);

  useEffect(() => {
    if (authToken !== null) {
      // to check that the user is logged in and has a token
      getCartItems();
    }
  }, [authToken]);
  //
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        API_URL,
        {
          productId: productId,
        },
        { headers: { token: authToken } }
      );
      console.log("Product added to cart:", data);
      if (data.status === "success") {
        // setnumberOfCartItems(data.numOfCartItems);
        // setCartDetails(data.data);
        // setcartId(data.cartId);
        getCartItems(); // refresh the cart items after adding a new product
      }
      return data;
    } catch (error) {
      console.log("Error adding to cart:", error);
      return error;
    }
  }
  async function getCartItems() {
    try {
      const { data } = await axios.get(API_URL, {
        headers: { token: authToken },
      });
      console.log("Cart items fetched:", data);
      if (data.status === "success") {
        setnumberOfCartItems(data.numOfCartItems);
        setCartDetails(data.data);
        setcartId(data.cartId);
        // setOwnerId(data.data.cartOwner);
      }
      return data;
    } catch (error) {
      console.log("Error fetching cart items:", error);
      return error;
    }
  }
  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(API_URL + "/" + productId, {
        headers: { token: authToken },
      });
      if (data.status === "success") {
        setnumberOfCartItems(data.numOfCartItems);
        setCartDetails(data.data);
        setcartId(data.cartId);
        // setOwnerId(data.data.cartOwner);

        return data;
      }
      console.log("Product removed from cart:", data);
    } catch (error) {
      console.log("Error removing from cart:", error);
      return error;
    }
  }

  async function UpdateItemQuantity(productId, count) {
    try {
      const { data } = await axios.put(
        API_URL + "/" + productId,
        {
          count: count,
        },
        {
          headers: { token: authToken },
        }
      );
      if (data.status === "success") {
        setnumberOfCartItems(data.numOfCartItems);
        setCartDetails(data.data);
        setcartId(data.cartId);
        // setOwnerId(data.data.cartOwner);

        return data;
      }
      console.log("Product removed from cart:", data);
    } catch (error) {
      console.log("Error removing from cart:", error);
      return error;
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete(
        API_URL,

        {
          headers: { token: authToken },
        }
      );
      if (data.message === "success") {
        setnumberOfCartItems(0);
        setCartDetails(null);
        setcartId(null);
      }
      console.log("all removed from cart:", data);

      return data;
    } catch (error) {
      console.log("Error removing from cart:", error);
      return error;
    }
  }

  async function handlePayment(shippingAddress, isOnline) {
    // if the checkbox in the checkout comp. is checked, isonline will be true then we use the api url of the online payment , otherwise we use the url of the cach payment
    const API_URL = isOnline
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    try {
      const { data } = await axios.post(
        API_URL,
        { shippingAddress },
        {
          headers: { token: authToken },
        }
      );
      if (data.status === "success") {
        setnumberOfCartItems(0);
        setCartDetails(null);
        setcartId(null);
      }
      return data;
    } catch (error) {
      console.log("Error during checkout:", error);
      return error;
    }
  }

  async function getMyOrders() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}`
      );
      console.log("My orders areeeee:", data);

      setallOrdersData(data);
      // setOwnerId(data[0].user._id)
      console.log("ownerid", ownerId);

      return data;
    } catch (error) {
      console.log("Error fetching my orders:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <CartContext.Provider
        value={{
          // these are the value and function that are passed to any component that uses the CartContext
          addToCart,
          numberOfCartItems,
          getCartItems,
          cartDetails,
          setCartDetails,
          removeFromCart,
          UpdateItemQuantity,
          clearCart,
          handlePayment,
        
          getMyOrders,
          allOrdersData,
          setallOrdersData,
          loading,
          error,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
