import ReviewsDAO from '../dao/ReviewsDAO.js';

export default class ReviewsController {
  // Add a new review
  static async apiPostReview(req, res, next) {
    try {
      const { movie_id: movieId, review } = req.body; // Destructure required fields
      if (!movieId || !review) {
        return res.status(400).json({ error: 'Movie ID and review content are required.' });
      }

      // User information from the token
      const userInfo = {
        name: req.user.email, // Use email from the token
        _id: req.user.id, // User ID from the token
      };

      const date = new Date(); // Current date

      // Call DAO to add the review
      const reviewResponse = await ReviewsDAO.addReview(movieId, userInfo, review, date);
      res.status(201).json({ status: 'success', review: reviewResponse });
    } catch (e) {
      console.error('Error in apiPostReview:', e.message);
      res.status(500).json({ error: 'Unable to post review.' });
    }
  }

  // Update an existing review
  static async apiUpdateReview(req, res, next) {
    try {
      const { review_id: reviewId, review } = req.body; // Destructure required fields
      if (!reviewId || !review) {
        return res.status(400).json({ error: 'Review ID and updated review content are required.' });
      }

      const date = new Date(); // Current date

      // Call DAO to update the review
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.user.id, // Only the owner can update
        review,
        date
      );

      if (reviewResponse.modifiedCount === 0) {
        return res.status(403).json({
          error: 'Unable to update review. You may not be the original poster.',
        });
      }

      res.status(200).json({ status: 'success', review: reviewResponse });
    } catch (e) {
      console.error('Error in apiUpdateReview:', e.message);
      res.status(500).json({ error: 'Unable to update review.' });
    }
  }

  // Delete an existing review
  static async apiDeleteReview(req, res, next) {
    try {
      const { review_id: reviewId } = req.body; // Destructure required fields
      if (!reviewId) {
        return res.status(400).json({ error: 'Review ID is required.' });
      }

      // Call DAO to delete the review
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, req.user.id);

      if (reviewResponse.deletedCount === 0) {
        return res.status(403).json({
          error: 'Unable to delete review. You may not be the original poster.',
        });
      }

      res.status(200).json({ status: 'success', review: reviewResponse });
    } catch (e) {
      console.error('Error in apiDeleteReview:', e.message);
      res.status(500).json({ error: 'Unable to delete review.' });
    }
  }
}
