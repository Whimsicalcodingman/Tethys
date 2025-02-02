import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import ReviewsController from './ReviewsController.js';
import MoviesController from './MoviesController.js';

const router = express.Router();

class MoviesRoute {
  static configRoutes(router) {
    // Movie-related routes
    router.route('/').get(MoviesController.apiGetMovies);
    router.route('/id/:id').get(MoviesController.apiGetMovieById);
    router.route('/ratings').get(MoviesController.apiGetRatings);

    // Review routes with authMiddleware
    router.route('/review')
      .post(authMiddleware, ReviewsController.apiPostReview)
      .put(authMiddleware, ReviewsController.apiUpdateReview)
      .delete(authMiddleware, ReviewsController.apiDeleteReview);

    return router;
  }
}

export default MoviesRoute;
