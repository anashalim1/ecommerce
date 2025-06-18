import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext.jsx";
import Loader from "../Loader/Loader.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Wishlist() {
  const { ownerId, authToken } = useContext(AuthContext);
  const { getWishlist, wishlist, removeItemWishlist, loading, error } =
    useContext(CartContext);
  useEffect(() => {
    if (authToken) {
      getWishlist();
    }
  }, [authToken]);

  async function removingFromWishlist(productId) {
    const res = await removeItemWishlist(productId);
    // await getWishlist();
    if (res.status === "success") {
      toast.success("Product removed from wishlist successfully!", {
        theme: "dark",
        position: "bottom-right",
      });
    } else {
      toast.error("Error removing product from wishlist!", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  }


  useEffect(() => {
    document.title = "Wishlist";
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <>
      <section>
        {Array.isArray(wishlist) && wishlist.length > 0 ? (
          <div className="shadow-md p-8 bg-gray-500 rounded-lg mx-7 my-9">
            <table className="w-full text-m text-center text-black rounded-lg">
              <thead className="uppercase bg-green-100 text-black">
                <tr>
                  <th scope="col" className="p-5">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="p-5">
                    Product
                  </th>
                  <th scope="col" className="p-5">
                    Price
                  </th>
                  <th scope="col" className="p-5">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((product) => (
                  <tr key={product._id} className="bg-white">
                    <td className="p-4">
                      <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.brand.name}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.brand.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.price} EGP
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => removingFromWishlist(product.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 flex justify-between">
              <div className="flex items-center gap-2">
                <button
                  // onClick={() => clearWishlist()}
                  type="button"
                  className="bg-red-700 text-white hover:bg-red-800 text-xl font-bold rounded-lg px-5 py-2.5 me-2 mb-2"
                >
                  <i className="fa-solid fa-trash">
                    <span className="ms-3">Drop wishlist</span>
                  </i>
                </button>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-1/3 text-center mx-auto text-2xl text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-bold rounded-lg p-5 my-2"
            >
              Proceed to checkout
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px] font-bold">
            <span>
              There are no items in your wishlist. You can start shopping from
            </span>
            <Link className="underline text-blue-600 pl-1.5 text-lg" to="/">
              Here
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
