import express from 'express'; // Framework for building APIs
import cors from 'cors'; // Middleware to handle Cross-Origin Resource Sharing
import MoviesRoute from './api/MoviesRoute.js'; // Movie routes for API endpoints
import dotenv from 'dotenv'; // Loads environment variables from .env
import mongodb from 'mongodb'; // MongoDB driver for database connection
import mongoose from 'mongoose'; // Mongoose for schema validation and queries
import MoviesDAO from './dao/MoviesDAO.js'; // DAO for movies collection
import ReviewsDAO from './dao/ReviewsDAO.js'; // DAO for reviews collection
import authRoutes from './api/authRoutes.js'; // Authentication routes for login/register

// Main application class
class Index {
  static app = express(); // Express app instance
  static router = express.Router(); // Router instance

  // Main entry point for the app
  static main() {
    dotenv.config(); // Load .env variables
    Index.setUpServer(); // Setup Express server and middleware
    Index.setUpDatabase(); // Connect to MongoDB
  }

  // Connect to the MongoDB database
  static async setUpDatabase() {
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI); // MongoDB connection URI
    const port = process.env.PORT || 8000; // Define server port
    try {
      console.log("Connecting to MongoDB...");
  
      // Connect Mongoose to MongoDB
      await mongoose.connect(process.env.MOVIEREVIEWS_DB_URI);
      console.log("Mongoose connected successfully!");
  
      // Inject MongoDB connection for DAOs
      await MoviesDAO.injectDB(client);
      await ReviewsDAO.injectDB(client);
  
      // Start the server
      Index.app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
      });
    } catch (e) {
      console.error("Database connection error:", e.message, e.stack);
      process.exit(1); // Exit the process if the connection fails
    }
  }
  

  // Setup the Express server
  static setUpServer() {
    Index.app.use(cors()); // Enable CORS for all routes
    Index.app.use(express.json()); // Parse incoming JSON requests

    // Log all incoming requests
    Index.app.use((req, res, next) => {
      console.log(`[${req.method}] ${req.originalUrl}`);
      next();
    });

    // Mount authentication routes at /api
    Index.app.use('/api', authRoutes);

    // Mount movie-related routes at /api/v1/movies
    Index.app.use('/api/v1/movies', MoviesRoute.configRoutes(Index.router));

    // Handle undefined routes
    Index.app.use('*', (req, res) => {
      res.status(404).json({ error: 'Not found' });
    });
  }
}

// Start the application
Index.main();
