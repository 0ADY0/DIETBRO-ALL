// middleware/errorHandler.js - Using ES Module syntax

const errorHandler = (err, req, res, next) => {
  // Create a copy of the error object to avoid modifying the original
  let error = { ...err };
  error.message = err.message; // Ensure the message property is copied

  // Log the full error for debugging purposes (especially in development)
  console.error('Error:', err);

  // Set a default status code if one isn't already set by a previous middleware
  // If res.statusCode is 200 (meaning no error status was set yet), default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode); // Set the response status code

  // Mongoose bad ObjectId (e.g., trying to find a document with an invalid ID format)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`; // More specific message
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key error (e.g., trying to create a user with an existing email)
  if (err.code === 11000) {
    // Extract the field that caused the duplicate error
    const field = Object.keys(err.keyValue)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error (e.g., missing required fields, invalid data types)
  if (err.name === 'ValidationError') {
    // Map through the errors object to get all validation messages
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // Send the error response
  res.json({
    success: false,
    // Use the custom error message if available, otherwise a generic server error message
    message: error.message || 'Server Error',
    // In development, send the stack trace for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler; // Use export default for ES Modules
