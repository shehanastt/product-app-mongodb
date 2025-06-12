import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv' 
import productRoute from "./routes/productRoute.js";
import connectDB from './db/connectDB.js';

dotenv .config()

const app = express()
const PORT = process.env.PORT || 8000;

connectDB()

// middleware
app.use(express.json());
app.use(cors());

// route
app.use("/api/products",productRoute);

// Custom error handler
app.use((error, req, res, next) => {
  res.status(error.code || 500).json({
    message: error.message || "An unknown error occurred!",
    status: false
  });
});

// starting server
app.listen(PORT, ()=> {
    console.log(`server running on http://localhost:${PORT}`);
})