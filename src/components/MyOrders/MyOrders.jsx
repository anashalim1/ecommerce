import { CartContext } from "../../context/CartContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
export default function MyOrders() {
  const { getMyOrders,allOrdersData,loading,error } = useContext(CartContext);
   const { ownerId } = useContext(AuthContext);

  // useEffect to call the getMyOrders function only if there is an owner id and when the component mounts
   // Call the function to fetch orders when the component mounts
  useEffect(() => {
    if (ownerId) {
      getMyOrders();
    }
  }, [ownerId]);
useEffect(()=>{
  document.title = "All Orders";
  window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
},[]) 
  
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
      ) :allOrdersData && allOrdersData?.length > 0 ? (
        <>
          <span className="w-full block bg-green-100 text-green-800 font-medium  px-2.5 py-2.5  dark:bg-green-900 dark:text-green-300">
            Total number of orders {allOrdersData.length}
          </span>

          <div className="relative overflow-x-auto shadow-md ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number of items
                  </th>
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
                    Delivery status
                  </th>
                </tr>
              </thead>
              <tbody>
                {allOrdersData.map((order) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </th>
                    <td className="px-6 py-4">
                      {order.cartItems?.length}
                    </td>
                    <td className="px-6 py-4">
                      {order.totalOrderPrice} EGP
                    </td>
                    <td className="px-6 py-4">
                      {order.paymentMethodType}
                    </td>
                    <td className="px-6 py-4">
                      {order.shippingAddress?.city}
                    </td>
                    <td className="px-6 py-4">
                      {order.isDelivered ? "Delivered" : "in Progress"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h3 className="text-center text-gray-500 py-4">You have no orders</h3>
      
      )}
    </>
  );
}