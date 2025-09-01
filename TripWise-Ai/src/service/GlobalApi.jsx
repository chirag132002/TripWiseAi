import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const GetPlaceImage = async (query) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        per_page: 1,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].urls.small;
    } else {
      return "https://via.placeholder.com/400x300?text=No+Image";
    }
  } catch (error) {
    console.error("Unsplash fetch error:", error.message);
    return "https://via.placeholder.com/400x300?text=Error";
  }
};
