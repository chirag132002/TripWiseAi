import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg");

  useEffect(() => {
    if (trip?.userSelection?.location) {
      fetchPhoto(trip.userSelection.location);
    }
  }, [trip]);

  const fetchPhoto = async (location) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${location}&client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }&per_page=1`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setPhotoUrl(data.results[0].urls.regular);
      }
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl}
          alt={trip?.userSelection?.location}
          className="object-cover rounded-xl h-[220px] w-full"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} budget.
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
