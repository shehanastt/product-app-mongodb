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

//
app.use("/api/products",productRoute);

// starting server
app.listen(PORT, ()=> {
    console.log(`server running on http://localhost:${PORT}`);
})