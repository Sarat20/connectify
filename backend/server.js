import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connectDb from './config/mongodb.js';
import cookieParser from 'cookie-parser';

connectDb();

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoute.js'

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/chat',chatRoutes);


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

