import MoviesDAO from '../dao/MoviesDAO.js';

export default class MoviesController {
  /**
   * Fetch movies with optional filters, pagination, and a limit on movies per page.
   */
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    // Build filters
    const filters = {};
    if (req.query.title) {
      filters.title = req.query.title; // Add title filter
    }
    if (req.query.rated) {
      filters.rated = req.query.rated; // Add rating filter
    }

    try {
      // Fetch movies from DAO
      const { moviesList, totalNumMovies } = await MoviesDAO.getMovies(
        { filters, page, moviesPerPage }
      );

      // Construct response
      const response = {
        movies: moviesList,
        page,
        filters,
        entries_per_page: moviesPerPage,
        total_results: totalNumMovies,
      };

      res.json(response); // Send response
    } catch (error) {
      console.error(`Error in apiGetMovies: ${error}`);
      res.status(500).json({ error: 'Unable to fetch movies' });
    }
  }

  /**
   * Fetch a single movie by its ID, including associated reviews.
   */
  static async apiGetMovieById(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({ error: 'Movie ID is required' });
        return;
      }

      const movie = await MoviesDAO.getMovieById(id);

      if (!movie) {
        res.status(404).json({ error: 'Movie not found' });
        return;
      }

      res.json(movie);
    } catch (error) {
      console.error(`Error in apiGetMovieById: ${error}`);
      res.status(500).json({ error: 'Unable to fetch the movie' });
    }
  }

  /**
   * Fetch distinct ratings from the movies collection.
   */
  static async apiGetRatings(req, res, next) {
    try {
      const ratings = await MoviesDAO.getRatings();

      if (!ratings || ratings.length === 0) {
        res.status(404).json({ error: 'No ratings found' });
        return;
      }

      res.json(ratings);
    } catch (error) {
      console.error(`Error in apiGetRatings: ${error}`);
      res.status(500).json({ error: 'Unable to fetch ratings' });
    }
  }
}
