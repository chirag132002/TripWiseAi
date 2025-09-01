import React, { useEffect, useState } from "react";
import { GetPlaceImage } from "@/service/GlobalApi";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (trip?.userChoice?.location?.label) {
      fetchImage();
    }
  }, [trip]);

  const fetchImage = async () => {
    const img = await GetPlaceImage(trip?.userChoice?.location?.label);
    setPhotoUrl(img);
  };

  return (
    <div className="flex justify-between items-center mt-12 md:mx-16 lg:mx-48 p-6 rounded-lg shadow-lg">
      {photoUrl && (
        <img
          className="h-40 w-40 rounded-full object-cover"
          src={photoUrl}
          alt="Trip Image"
        />
      )}
      <div className="flex flex-col ml-6 items-end">
        <div className="text-4xl font-bold mb-2 flex items-center">
          🗺️ {trip?.userChoice?.location?.label}
        </div>
        <div className="text-xl mb-1 flex items-center">
          📅 <span className="font-semibold ml-2">Duration:</span>
          {trip?.userChoice?.noOfDays} days
        </div>
        <div className="text-xl mb-1 flex items-center">
          💰 <span className="font-semibold ml-2">Budget:</span>
          {trip?.userChoice?.budget}
        </div>
        <div className="text-xl flex items-center">
          👥 <span className="font-semibold ml-2">Traveling with:</span>
          {trip?.userChoice?.noOfPeople}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
