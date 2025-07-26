// C:\javashit\beginingdietbro\theone\server\config\database.js

import mongoose from 'mongoose'; // Use import

const connectDB = async () => {
  try {
    // Ensure dotenv is loaded before this file, typically in server.js
    // Access the MongoDB URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, { // Changed from MONGODB_URI to MONGO_URI
      // These options are generally not needed for Mongoose 6+ unless you have specific requirements
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB; // Use export default
