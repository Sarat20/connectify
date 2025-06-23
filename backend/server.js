import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connectDb from './config/mongodb.js';

connectDb();

import authRoutes from './routes/authRoutes.js'


const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use('/api/auth',authRoutes);



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

