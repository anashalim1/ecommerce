import { CartContext } from "../../context/CartContext.jsx";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
export default function MyOrders() {
  const { getMyOrders, allOrdersData, loading, error } =
    useContext(CartContext);
  const { ownerId } = useContext(AuthContext);

  // useEffect to call the getMyOrders function only if there is an owner id and when the component mounts
  // Call the function to fetch orders when the component mounts
  useEffect(() => {
    if (ownerId) {
      getMyOrders();
    }
  }, [ownerId]);
  useEffect(() => {
    document.title = "All Orders";
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : allOrdersData && allOrdersData?.length > 0 ? (
        <div className="">
          <span className=" block font-medium   bg-green-900 text-green-100 px-6 py-3 rounded-md m-7 text-center w-fit">
            Total number of orders {allOrdersData.length}
          </span>

          <div className="relative overflow-x-auto shadow-md p-7 bg-gray-200 rounded-lg mx-7">
            <table className="w-full text-m text-center  text-black rounded-lg overflow-hidden ">
              <thead className="text-sm  uppercase bg-green-100  text-black ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delivery status                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment method
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delivery address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number of items
                  </th>
                </tr>
              </thead>
              <tbody>
                {allOrdersData.slice().reverse().map((order) => (
                  <tr className="odd:bg-white  even:bg-gray-100  border-b  border-gray-200">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {new Date(order.createdAt).toLocaleDateString()}
                    </th>
                    <td className="px-6 py-4">
                      {order.isDelivered ? "Delivered" : "in Progress"}
                    </td>

                    <td className="px-6 py-4">{order.totalOrderPrice} EGP</td>
                    <td className="px-6 py-4">{order.paymentMethodType}</td>
                    <td className="px-6 py-4">{order.shippingAddress?.city}</td>
                    <td className="px-6 py-4">{order.cartItems?.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h3 className="text-center text-gray-500 py-4">You have no orders</h3>
      )}
    </>
  );
}
