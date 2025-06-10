import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CheckOut from "../CheckOut/CheckOut";
export default function Cart() {
  const {
    cartDetails,
    setCartDetails,
    numberOfCartItems,
    removeFromCart,
    UpdateItemQuantity,
    clearCart,
  } = useContext(CartContext); // these are the values and function that are provided by the CartContext
  // instead of using the function from the cartcontext directly , we create a "bridge " function to `// handle the toast notifications
  async function removingItemsFromCart(productId) {
    const res = await removeFromCart(productId);
    if (res.status === "success") {
      toast.success("Product removed from cart successfully!", {
        theme: "dark",
        position: "bottom-right",
      });
    } else {
      toast.error("Error removing product from cart!", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  }
  // instead of using the function from the cartcontext directly , we create a "bridge " function to `// handle the toast notifications
  async function UpdateQuantity(productId, count) {
    const res = await UpdateItemQuantity(productId, count);
    if (res.status === "success") {
      toast.success("Product updated in cart successfully!", {
        theme: "dark",
        position: "bottom-right",
      });
    } else {
      toast.error("Error updating product from cart!", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  }
useEffect(()=>{
  document.title = "Cart";
  window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
},[]) 
  return (
    <>
      <section>
        <div className="p-4 flex justify-between">
          {cartDetails && numberOfCartItems > 0 && (
            <div>
              <span className="bg-green-100 text-green-800  font-medium me-2 px-2.5 py-1.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                Total Price {cartDetails.totalCartPrice}EGP
              </span>
              <button
                onClick={() => clearCart()}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <i className="fa-solid fa-trash"> Drop cart</i>
              </button>
            </div>
          )}
        </div>

        {cartDetails && numberOfCartItems > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {/* Decrease Qty Button */}
                        <button
                          onClick={() =>
                            UpdateQuantity(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>

                        <span>{product.count}</span>

                        {/* Increase Qty Button */}
                        <button
                          onClick={() =>
                            UpdateQuantity(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          removingItemsFromCart(product.product.id)
                        }
                        type="button"
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              to={"/checkout"}
              className="focus:outline-none block w-full text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-5 my-2"
            >
              Proceed to checkout
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px] font-bold">
            <span>
              There is no items in your cart, you can start shopping from
              
            </span>
            <Link className="underline text-blue-600 pl-1.5 text-lg " to={"/"}>
                Here
              </Link>
          </div>
        )}
      </section>
    </>
  );
}
