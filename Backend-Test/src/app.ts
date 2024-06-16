import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import contactRouter from './routes/contact.route';
import { customRateLimiterMiddleware } from './middlewares/rateLimitter.middleware';
import Database from './config/db';

configDotenv();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', customRateLimiterMiddleware, contactRouter);


Database.connect();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});