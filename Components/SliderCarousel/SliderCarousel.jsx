"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import axios from "axios";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";
import "./SliderCarousel.css";

const SliderCarousel = () => {
  const [bannerCarousel, setBannerCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`api/carouselbanner`);
      const banner = await response.data;
      setBannerCarousel(banner);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <main>
      {isLoading && <LoadingSkeleton />}
      {!isLoading && (
        <div>
          <div className="carousel">
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              centeredSlides={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Autoplay, Pagination, EffectFade]}
              className="mySwiper"
            >
              {bannerCarousel
                .map((banner) => (
                  <SwiperSlide key={banner._id} className="swiper-slide">
                    <Link href={`/products/${banner.category}`} passHref>
                      <div className="image-container">
                        <Image
                          src={banner.image}
                          alt={banner.category}
                          layout="fill"
                          objectFit="cover"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                          className="img-fluid"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
                .reverse()}
              <div className="swiper-pagination"></div>
            </Swiper>
          </div>
        </div>
      )}
    </main>
  );
};

export default SliderCarousel;
