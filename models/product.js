import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    is_Deleted:{
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product',productSchema);

export default Product