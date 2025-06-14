import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import Product from "../Product/Product";
import { useParams } from "react-router-dom"; // <-- import useParams

export default function FilterProducts() {
      const { id } = useParams(); // <-- get the id from the URL

    const [brandFilter, setBrandFilter] = useState([]);
  const { data, isError, isLoading } = useQuery({
    queryKey: "filterProducts", // unique key for the query
    queryFn: getFilterProducts, // function to fetch data
  });
  async function getFilterProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  useEffect(() => {
    if (data) {
      const brandProducts = data.data.data.filter(

        (product) => product.brand?._id==id
      );
      setBrandFilter(brandProducts);
    }
  }, [data]);

  console.log("brand products", brandFilter);
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
          ) : ( <div className="row flex flex-wrap mx-6 ">
            {brandFilter && brandFilter.length > 0 ? brandFilter.map(
              (product) => (
                <Product key={product.id} product={product} />
              )
            ) : (
              <div className="text-center w-full flex flex-col items-center justify-center ">
                <p className="text-gray-500 font-bold">Sorry we don't have any products from this brand yet ...</p>
                <Link  to="/" className="text-gray-900 font-bold hover:underline">Browse other products </Link>
              </div>
            )}


          </div>
            
          )}
        </div>
      </section>
    </>
  );
}
                
