import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link is used to create links to other pages in the application
import { useParams } from "react-router-dom"; // <-- import useParams
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
export default function CategoriesDetails() {
  const { id } = useParams(); // <-- get the id from the URL
  const [categorieFilter, setCategorieFilter] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  async function getCategoriesDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: "CategoriesDetails", // unique key for the query
    queryFn: getCategoriesDetails, // function to fetch data
  });
  useEffect(() => {
    if (data) {
      setCurrentCategory(data.data.data.name);
    }
  }, [data]);

  useEffect(() => {
    console.log("Updated category name:", currentCategory);
  }, [currentCategory]);

  async function getProductsDetails() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data: prodcustData ,isError :productError , isLoading:productLoading} = useQuery({
    queryKey: "ProductsDetails",
    queryFn: getProductsDetails,
  });
  useEffect(() => {
    if (prodcustData && currentCategory) {
      console.log("prodcustData:", prodcustData);
      const categoryProducts = prodcustData.data.data.filter(
        (product) => product.category._id === id
      );
      setCategorieFilter(categoryProducts);
    }
  }, [prodcustData]);

  useEffect(() => {
    console.log(" category products:", categorieFilter);
  }, [categorieFilter]);

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
              {categorieFilter && categorieFilter.length > 0 ? (
                categorieFilter.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              ) : (
                <div className="text-center w-full flex flex-col items-center justify-center ">
                  <p className="text-gray-500 font-bold">
                    Sorry we don't have any products from this category yet ...
                  </p>
                  <Link
                    to="/"
                    className="text-gray-900 font-bold hover:underline"
                  >
                    Browse other products
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
