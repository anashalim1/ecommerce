import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  async function getCategories() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );

      setCategories(data.data);
      console.log(data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching recent products:", error);
      setError(error.response.data.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // Call the function to fetch recent products when the component mounts, it make sure it onlt runs the function once when the compeonet is mounted
    getCategories();
  }, []);
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="slider-container  ">
            
              <Slider {...settings}>
                {categories.map((category) => (
                  <Link to={`/categories/${category._id}`}>
                  <div key={category._id}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="mx-auto h-40 object-contain "
                    />
                    <h2>{category.name}</h2>
                  </div>
                  </Link>
                ))}
              </Slider>
            
          </div>
        </div>
      </section>
    </>
  );
}
