import mongoose from "mongoose";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 *
 * @param {Error | ApiError} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 *
 * @description This middleware is responsible to catch the errors from any request handler wrapped inside the {@link asyncHandler}
 */

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Check if the error is an instance of an ApiError class which extends native Error class
  
  if (!(error instanceof ApiError)) {
    // if not
    // create a new ApiError instance to keep the consistency

    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    // set a message from native Error instance or a custom one
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error.stack);
  }

  // Now we are sure that the `error` variable will be an instance of ApiError class

  const response = {
    ...err,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Error stack traces should be visible in development for debugging
  };

  // Send the response
  return res.status(err.statusCode).json(response);
};

export { errorHandler };
