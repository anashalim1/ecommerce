import axios from "axios";
import React, { use, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
export default function RecentProducts() {

  //METHOD 1 TO FETCH DATA USING useQuery
const {data, isError, isLoading} = useQuery({
  queryKey:'recentProducts', // unique key for the query
  queryFn:getRecentProducts // function to fetch data
})
console.log("recent products", data);

async function getRecentProducts() {
  return  axios.get('https://ecommerce.routemisr.com/api/v1/products')
  
}

  //METHOD 2 to fetch data using custom hook
  // const { data, error, loading } = useFetch(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  // );
  // console.log("recent products", data);

  // METHOD 3 to fetch data using useState and useEffect
  // const [recentProducts, setRecentProducts] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  // async function getRecentProducts() {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/products"
  //     );
  //     console.log(data.data);
  //     setRecentProducts(data.data);
  //     setError(null);
  //   } catch (error) {
  //     console.error("Error fetching recent products:", error);
  //     setError(error.response.data.message);
  //     setRecentProducts([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // useEffect(() => {
  //   // Call the function to fetch recent products when the component mounts, it make sure it onlt runs the function once when the compeonet is mounted
  //   getRecentProducts();
  // }, []);
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader />
            </div>
          ) : isError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {isError}
            </div>
          ) : (
            <div className="row flex flex-wrap mx-6 ">
              {data.data.data.map(
                (
                  product // loop using map to show each product using the product component
                ) => (
                  <Product key={product._id} product={product} />
                )
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
