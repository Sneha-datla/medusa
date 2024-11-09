import express from 'express';
import { AppDataSource } from './datasource';  // Import your data-source setup
import vendorRoutes from './routes/vendor.route';  // Import the vendor routes
import cors from 'cors';  // Import the CORS package

const app = express();

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(cors());  // Apply CORS middleware globally

// Register the vendor routes
app.use('/api/vendors',vendorRoutes);  // All vendor routes will be prefixed with '/api/vendors'

// Start the database connection (make sure it's done before starting the server)
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    // Start the Express server after DB connection is established
    app.listen(9000, () => {
      console.log('Server is running on port 9000');
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
