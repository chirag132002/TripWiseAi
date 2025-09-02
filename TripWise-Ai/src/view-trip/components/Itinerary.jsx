import React from "react";
import ItineraryCard from "./ItineraryCard";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Itinerary = ({ trip }) => {
  // Debugging to see what the API returns
  console.log("Itinerary data:", trip?.tripData?.itinerary);

  // Ensure itinerary is always an array
  const itinerary = Array.isArray(trip?.tripData?.itinerary)
    ? trip.tripData.itinerary
    : trip?.tripData?.itinerary
    ? [trip.tripData.itinerary] // wrap single object into array
    : [];

  return (
    <div className="container mx-auto px-6 py-12 w-4/5">
      <h2 className="text-4xl font-bold text-center mb-8">Places to Visit</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {itinerary.map((item, i) => (
          <div
            key={i}
            className="itinerary-card p-4 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4">{item?.day}</h3>
            <div className="space-y-6">
              {Array.isArray(item?.plan)
                ? item.plan.map((plan, index) => (
                    <ItineraryCard plan={plan} key={index} />
                  ))
                : item?.plan && (
                    <ItineraryCard plan={item.plan} key={`single-${i}`} />
                  )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
