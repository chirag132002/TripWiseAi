// Hotels.jsx
import React from "react";
import HotelCardItem from "./HotelCardItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hotels = ({ trip }) => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="mt-12 mx-auto md:mx-16 lg:mx-32 p-6 rounded-lg bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-8">
        Hotel Recommendations
      </h2>
      <div className="slider-container">
        <Slider {...settings}>
          {trip?.tripData?.hotels?.map((h, i) => (
            <div key={i} className="p-3">
              <HotelCardItem h={h} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hotels;
