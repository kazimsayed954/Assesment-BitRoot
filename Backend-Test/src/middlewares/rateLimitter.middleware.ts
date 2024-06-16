import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

const customRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute per IP
    message: 'Too many requests from this IP, please try again in a minute.',
  });

  export const customRateLimiterMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    customRateLimiter(req, res, (err) => {
        if (err) {
          // Handle rate limit exceeded error, e.g., send an error response
          return res.status(429).json({ message: 'Rate limit exceeded' });
        }
        
        // If rate limit is not exceeded, continue to the next middleware or route
        next();
      });
  }