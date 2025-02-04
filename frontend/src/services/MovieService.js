import axios from 'axios';

export default class MovieService {
  static async getMovies(query = '', by = 'title', page = 0) {
    const res = await axios.get(
      `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`,
    );
    return res.data;
  }

  static async getMovie(id) {
    const res = await axios.get(
      `http://localhost:5000/api/v1/movies/id/${id}`,
    );

    return res.data;
  }

  static async getRatings() {
    const res = await axios.get(
      'http://localhost:5000/api/v1/movies/ratings',
    );

    return res.data;
  }

  // Add a new review
  static async addReview(movieId, name, reviewContent) {
    const token = localStorage.getItem('token'); // Get the stored token
    const res = await axios.post(
      'http://localhost:5000/api/v1/movies/review',
      {
        movie_id: movieId,
        name,
        review: reviewContent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      },
    );

    return res.data;
  }

  static async deleteReview(movieId, reviewId, token) {
    const res = await axios.delete('http://localhost:5000/api/v1/movies/review', {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
      data: {
        movie_id: movieId,
        review_id: reviewId, // Pass the review ID
      },
    });
  
    return res.data;
  }

  
}
