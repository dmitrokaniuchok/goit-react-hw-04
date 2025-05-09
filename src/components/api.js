import axios from "axios";

const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function fetchImages(query, page = 1) {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      client_id: apiKey,
      page,
      per_page: 12,
    },
  });

  return response.data;
}
