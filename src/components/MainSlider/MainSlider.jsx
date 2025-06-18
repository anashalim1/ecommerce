import React from "react";
import img1 from "../../assets/images/grocery-banner.png";
import img2 from "../../assets/images/grocery-banner-2.jpeg";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: false,
    autoplaySpeed: 2000,
    
  };
  const images = [
    { src: slider1, alt: "slider1" },
    { src: slider2, alt: "slider2" },
    { src: slider3, alt: "slider3" },
  ];

  return (
    <>
      <section className="py-20 ">
        <div className="container mx-auto ">
          <div className="flex items-stretch">
            <div className="w-2/3  ">
              <Slider {...settings} >
                {images.map((image, idx) => (
                  <div key={idx} className="h-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            {/* Side images take 1/3 of the width */}
            <div className="w-1/3 flex flex-col justify-between">
              <img
                src={img1}
                alt="grocery"
                className="h-1/2 object-cover w-full rounded-xl"
                style={{ height: "50%" }}
              />
              <img
                src={img2}
                alt="bread"
                className="h-1/2 object-cover w-full rounded-xl"
                style={{ height: "50%" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
