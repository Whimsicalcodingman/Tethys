import axios from 'axios';

export default class ReviewService {
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

  static async updateReview(reviewId, updatedReview, token) {
    const res = await axios.put(
      'http://localhost:5000/api/v1/movies/review', // Ensure this endpoint matches the route
      {
        review_id: reviewId,
        review: updatedReview,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
