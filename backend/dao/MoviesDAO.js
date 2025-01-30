import mongodb from "mongodb";

export default class MoviesDAO {
    static movies; // MongoDB movies collection reference
    static ObjectId = mongodb.ObjectId;

    /**
     * Inject the database connection.
     */
    static async injectDB(conn) {
        if (MoviesDAO.movies) {
            return;
        }
        try {
            MoviesDAO.movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection("movies");
        } catch (e) {
            console.error(`Unable to connect in MoviesDAO: ${e}`);
        }
    }

    /**
     * Get a list of movies with optional filters, pagination, and a limit on movies per page.
     */
    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {
        let query = {};

        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters.title } };
            } else if ("rated" in filters) {
                query = { rated: { $eq: filters.rated } };
            }
        }

        try {
            const cursor = await MoviesDAO.movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page);

            const moviesList = await cursor.toArray();
            const totalNumMovies = await MoviesDAO.movies.countDocuments(query);

            return { moviesList, totalNumMovies };
        } catch (e) {
            console.error(`Unable to issue find command: ${e}`);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }

    /**
     * Get distinct ratings from the movies collection.
     */
    static async getRatings() {
        try {
            return await MoviesDAO.movies.distinct("rated");
        } catch (e) {
            console.error(`Unable to get ratings: ${e}`);
            return [];
        }
    }

    /**
     * Get a movie by its ID, including its associated reviews.
     */
    static async getMovieById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new MoviesDAO.ObjectId(id), // Match the movie by its ID
                    },
                },
                {
                    $lookup: {
                        from: "reviews", // Join with the reviews collection
                        localField: "_id", // Movie's `_id`
                        foreignField: "movie_id", // Match with `movie_id` in reviews
                        as: "reviews", // Alias the resulting array as "reviews"
                    },
                },
            ];

            const movie = await MoviesDAO.movies.aggregate(pipeline).next();

            // If no movie is found, return null
            if (!movie) {
                throw new Error(`Movie with ID ${id} not found.`);
            }

            return movie;
        } catch (e) {
            console.error(`Something went wrong in getMovieById: ${e}`);
            throw e;
        }
    }
}
