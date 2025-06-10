import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom"; // <-- import useParams
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext.jsx";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [recentProduct, setRecentProduct] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, category } = useParams(); // <-- get the id from the URL
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { addToCart } = useContext(CartContext);

  async function addingToCart(productId) {
    const res = await addToCart(productId);
    if (res.status == "success") {
      toast.success("Product added to cart successfully!", {
        theme: "dark",
        position: "bottom-right",
      });
    } else {
      toast.error("Error adding product to cart!", {
        theme: "dark",
        position: "bottom-right",
      });
    }
  }

  async function getRecentProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}` // <-- use the id here
      );
      setRecentProduct(data.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching product");
      setRecentProduct({});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecentProduct();
  }, [id]); // <-- re-run if id changes


  useEffect(()=>{
    if(recentProduct.title){
    document.title = recentProduct.title; // mange the tab name 
    }
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  },[recentProduct]) 
  return (
    <>
      <section className="py-20 w-2/3 mx-auto">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="flex">
              <div className="w-1/3">
                {recentProduct.imageCover && (
                  <div className="slider-container">
                    <Slider {...settings}>
                      {console.log(recentProduct.images)}
                      {recentProduct?.images?.map((image) => (
                        <img src={image} alt={recentProduct.title} />
                      ))}
                    </Slider>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between  w-2/3 pl-6">
                <div>
                  <h1 className="text-2xl">{recentProduct.title}</h1>
                  <p>{recentProduct.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="card-text text-emerald-800 font-extrabold">
                      ${recentProduct.price}
                    </p>
                    <div className="flex gap-2">
                      <p>{recentProduct.ratingsAverage}</p>
                      <i className="fas fa-star pt-1 text-amber-400"></i>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addingToCart(recentProduct._id)}
                  type="button"
                  className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <RelatedProducts />
    </>
  );
}
