import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import prooductRoutes from './routes/productRoutes.js';


const port = process.env.PORT || 5000; 

connectDB();   // connect to MongoDB (call function from db.js)

const app = express();

app.get('/', (req, res) => {            // "home page route"
    res.send('API is running...');
});

app.use('/api/products', prooductRoutes);   // "use" the productRoutes



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});