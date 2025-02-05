import axios from 'axios';

// Get the base URL from the environment variable
const apiBaseUrl = import.meta.env.VITE_API_URL;

export default class MovieService {
  static async getMovies(filters = {}, page = 0) {
    const queryParams = new URLSearchParams({
      page,
      title: filters.title || '', // Add title filter if provided
      rated: filters.rating || '', // Add rating filter if provided
    }).toString();

    const res = await axios.get(
      `${apiBaseUrl}/api/v1/movies?${queryParams}`
    );
    return res.data;
  }

  static async getMovie(id) {
    const res = await axios.get(
      `${apiBaseUrl}/api/v1/movies/id/${id}`
    );

    return res.data;
  }

  static async getRatings() {
    const res = await axios.get(
      `${apiBaseUrl}/api/v1/movies/ratings`
    );

    return res.data;
  }
}
