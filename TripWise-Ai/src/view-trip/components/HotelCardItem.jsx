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
    const img = await GetPlaceImage(h?.name);
    setPhotoUrl(img);
  };

  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          h?.name +
          ", " +
          h?.address
        }
        target="_blank"
      >
        <div className="flex flex-col items-center justify-center">
          <img className="w-80 h-52 rounded-md" src={photoUrl} alt={h?.name} />
          <div className="flex w-full items-center justify-between px-8 mt-2">
            <div className="font-bold">{h.name}</div>
            <div className="flex items-center">
              {h.rating}
              <CiStar />
            </div>
          </div>
          <div className=" w-full px-8 my-1 text-md">{h.address}</div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
