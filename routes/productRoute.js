import express from 'express'
import { addProduct, deleteProductById, getProductById, getProducts, softDeleteProduct, updateProductById } from '../controllers/productController.js'

const router = express.Router();

router.get("/", getProducts);
router.post("/add",addProduct);
router.get("/:id",getProductById);
router.delete("/:id",deleteProductById);
router.patch("/:id",updateProductById);
router.patch("/:id",softDeleteProduct);
 
export default router;