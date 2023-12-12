import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000; 

connectDB();   // connect to MongoDB (call function from db.js)

const app = express();

// Body parser middleware (allows us to accept JSON data in the body of a POST request)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {            // "home page route"
    res.send('API is running...');
});

app.use('/api/products', productRoutes);   // "use" the productRoutes
app.use('/api/users', userRoutes);         // "use" the userRoutes
app.use('/api/orders', orderRoutes);         // "use" the orderRoutes

app.use(notFound);      // 404 error handler
app.use(errorHandler);  // error handler

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});