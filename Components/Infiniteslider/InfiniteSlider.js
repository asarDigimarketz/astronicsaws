"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./infiniteslider.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const Infiniteslider = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products`);
      const products = await response.data;
      setProducts(products);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const newformatString = (str) =>
    str
      .replace(/-/g, " ") // Replace all hyphens with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <>
      {isLoading && <LoadingSkeleton />}
      {!isLoading && (
        <Swiper
          modules={[Autoplay]} // Import the Autoplay module
          autoplay={{ delay: 2000 }} // Delay between slide transitions (2 seconds)
          slidesPerView={4} // Default number of slides visible at once
          spaceBetween={10} // Space between slides in pixels
          loop={true} // Enable infinite looping
          breakpoints={{
            250: {
              slidesPerView: 1, // 2 slides on screens 320px or wider (mobile)
            },
            320: {
              slidesPerView: 1, // 2 slides on screens 320px or wider (mobile)
            },
            640: {
              slidesPerView: 2, // 3 slides on screens 640px or wider (large mobile)
            },
            768: {
              slidesPerView: 3, // 3 slides on screens 768px or wider (tablet)
            },
            1024: {
              slidesPerView: 4, // 4 slides on screens 1024px or wider (desktop)
            },
          }}
          className="mySwiper productslider" // Custom CSS class
        >
          {/* Slide 1 */}
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                href={`/products/${product.category}`}
                className="slider-link"
              >
                <div className="sliderimages">
                  <img
                    src={product.image}
                    alt={newformatString(product.title)}
                  />
                </div>
                <div className="slider-title text-center">
                  <h3>{newformatString(product.title).slice(0, 25)}..</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Infiniteslider;
