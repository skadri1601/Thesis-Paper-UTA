// lib/cors.js
import Cors from "cors";

// Initialize the CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // Allow all origins in development, restrict in production
  origin:
    process.env.NODE_ENV === "production"
      ? "https://your-production-domain.com" // Replace with your production domain
      : "*", // Allow all origins in development
});

export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// CORS middleware to be applied in API routes
const corsMiddleware = async (req, res) => {
  try {
    await runMiddleware(req, res, cors);
  } catch (error) {
    res.status(500).json({ error: "Failed to run CORS middleware" });
  }
};

export default corsMiddleware;
