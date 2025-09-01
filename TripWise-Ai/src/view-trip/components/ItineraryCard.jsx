import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { GiTicket } from "react-icons/gi";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";
import { GetPlaceImage } from "@/service/GlobalApi";

const ItineraryCard = ({ plan }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (plan?.placeName) {
      fetchImage();
    }
  }, [plan]);

  const fetchImage = async () => {
    const img = await GetPlaceImage(plan?.placeName);
    setPhotoUrl(img);
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        plan?.placeName +
        ", "
      }
      target="_blank"
    >
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-300 itinerary-card">
        <img
          className="w-full h-48 object-cover"
          src={photoUrl}
          alt={plan.placeName}
        />
        <div className="p-4">
          <h4 className="text-xl font-semibold mb-2 flex items-center">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            {plan.placeName}
          </h4>
          <p className="flex items-center text-md mb-2 text-gray-700">
            <CiStar className="text-yellow-500 mr-1" />
            {plan.rating}
          </p>
          <p className="flex items-center text-md mb-1 text-gray-600">
            <MdAttachMoney className="text-green-500 mr-1" />
            Ticket Pricing: {plan.ticketPricing}
          </p>
          <p className="flex items-center text-md mb-1 text-gray-600">
            <FaClock className="text-gray-500 mr-1" />
            Travel Time: {plan.timeTravel}
          </p>
          <p className="text-md text-gray-600 truncate">{plan.placeDetails}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;
