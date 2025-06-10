import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <-- import useParams
import Product from "../Product/Product";
export default function RelatedProducts() {
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { category } = useParams(); // Assuming you want to filter by category, you can get it from the URL params
  async function getrelatedProducts() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );

      const relatedArray = data.data.filter(
        (product) => product.category.name === category
      ); // Filter products by category
      console.log(relatedArray);
      setrelatedProducts(relatedArray);
      setError(null);
    } catch (error) {
      console.error("Error fetching recent products:", error);
      setError(error.response.data.message);
      setrelatedProducts([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // Call the function to fetch recent products when the component mounts, it make sure it onlt runs the function once when the compeonet is mounted
    getrelatedProducts();
  }, []);

  return (
    <>
      <div className="row flex flex-wrap mx-10 ">
        {relatedProducts.map(
          (
            product // loop using map to show each product using the product component
          ) => (
            <Product key={product._id} product={product} />
          )
        )}
      </div>
    </>
  );
}
