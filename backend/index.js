import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/users', userRouter);


connectDB();

app.listen(port, () => {
    console.log(`App listens on: http://localhost:${port}`);
});
