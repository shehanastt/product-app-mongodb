import Product from "../models/product.js";
import HttpError from "../middlewares/httpError.js";



// list
export const getProducts = async (req, res, next) =>{

    try {
        const listedProducts = await Product.find({isDeleted: false});
        res.status(200).json({
            status: true,
            message: "",
            data: listedProducts
        });
    } catch (err){
        return next(new HttpError("error fetching products",500));
    }
};



// add
export const addProduct = async (req,res,next)=>{
    const {name , price} = req.body;

    if (!name || !price) {
    return next(new HttpError("Name and price are required", 400));
    }

    const newProduct = new Product({ name, price });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        return next(new HttpError("Failed to add product", 500));
        }
};



// get
export const getProductById = async (req, res, next) => {
    const {id} = req.params;

    try{
        const viewProduct = await Product.findOne({_id: id, isDeleted: false });
        if(!viewProduct){
            return next(new HttpError("product not found",404));
        } else {
            res.json(viewProduct);
        }
    } catch {
        return next(new HttpError("error fetching product",500));
    }
};



// delete (hard)
export const deleteProductById = async (req, res, next)=>{
    const {id} = req.params;

    try{
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            return next(new HttpError("product not found",404));
        } else {
            res.json({ message: 'Product deleted successfully' })
        }
    } catch (error){
        return next( new HttpError("error deleting product",500));
    }
};



// delete(soft)
export const softDeleteProduct = async (req,res,next)=> {
    const {id} = req.params;

    try{
        const delProduct = await Product.findByIdAndUpdate(id,
            { isDeleted: true},
            { new: true}
        );

        if(!delProduct){
            return next(new HttpError("not found",404));
        } else {
            res.json(delProduct)
        }
    } catch (err){
        return next(new HttpError("error soft deleting product",500));
    }
};



// update
export const updateProductById = async (req, res, next)=>{
    const {id} = req.params;
    const {name, price} = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,
            { name , price },
            { new: true, runValidators: true}
        );

        if(!updatedProduct){
            return next(new HttpError("product not found",404));
        } else {
            res.json(updatedProduct);
        }
    } catch (err){
        return next(new HttpError("error updating the product",500));
    }
};

       
