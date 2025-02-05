import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL;

export default class ReviewService {
  // Add a new review
  static async addReview(movieId, name, reviewContent) {
    const token = localStorage.getItem('token'); // Get the stored token
    const res = await axios.post(
      `${apiBaseUrl}/api/v1/movies/review`,
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

  // Update an existing review
  static async updateReview(reviewId, updatedReview) {
    const token = localStorage.getItem('token'); // Get the stored token
    const res = await axios.put(
      `${apiBaseUrl}/api/v1/movies/review`,
      {
        review_id: reviewId,
        review: updatedReview,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      },
    );

    return res.data;
  }

  // Delete a review
  static async deleteReview(movieId, reviewId) {
    const token = localStorage.getItem('token'); // Get the stored token
    const res = await axios.delete(`${apiBaseUrl}/api/v1/movies/review`, {
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
