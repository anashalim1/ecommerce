import React, { use, useEffect, useState } from "react";
import Product from "../Product/Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    document.title = "products";
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  async function getRecentProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: "recentProducts", // unique key for the query
    queryFn: getRecentProducts, // function to fetch data
  });
  console.log("recent products", data);
  useEffect(() => {
    if (data) {
      const fetchedProducts = data.data.data;
      setAllProducts(fetchedProducts);
      setSearchedProducts(fetchedProducts);
    }
  }, [data]);

  function handleSearch(e) {
    e.preventDefault(); // prevent page reload
    const results = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedProducts(results);
  }

  return (
    <>
      <section className="py-20">
        <form className="w-1/2 mx-auto " onSubmit={handleSearch}>
          <label
            for="default-search"
            className="mb-2 text-sm font-medium  sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchTerm}
              onChange={(e) => {
                const val = e.target.value;
                setSearchTerm(val);
                const results = allProducts.filter((product) =>
                  product.title.toLowerCase().includes(val.toLowerCase())
                );
                setSearchedProducts(results);
              }}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search products"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>

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
              {searchedProducts.map(
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
