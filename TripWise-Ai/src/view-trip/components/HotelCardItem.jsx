// HotelCardItem.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { GetPlaceImage } from "@/service/GlobalApi";

const HotelCardItem = ({ h }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (h?.name) {
      fetchImage();
    }
  }, [h]);

  const fetchImage = async () => {
    try {
      const img = await GetPlaceImage(h?.name);
      setPhotoUrl(img);
    } catch (err) {
      console.error("Error fetching hotel image:", err);
      setPhotoUrl("");
    }
  };

  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent(`${h?.name}, ${h?.address}`)
        }
        target="_blank"
      >
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 hover:scale-105 transition-transform duration-300">
          <img
            className="w-80 h-52 rounded-md object-cover"
            src={photoUrl || h?.imageUrl || "/fallback-hotel.jpg"}
            alt={h?.name}
            onError={(e) =>
              (e.currentTarget.src = photoUrl || "/fallback-hotel.jpg")
            }
          />
          <div className="flex w-full items-center justify-between px-2 mt-3">
            <div className="font-bold text-lg truncate">{h?.name}</div>
            <div className="flex items-center text-yellow-600 font-medium">
              {h?.rating || "N/A"} <CiStar className="ml-1" />
            </div>
          </div>
          <div className="w-full px-2 mt-1 text-sm text-gray-600 line-clamp-2">
            {h?.address}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
