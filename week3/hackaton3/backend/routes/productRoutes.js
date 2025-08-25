import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProductById,
  getAllProducts,
  getAvailableFilterOptions,
  getCollections,
  getFilteredProductsByOption,
  getProductByID,
  getProductBySlug,
  getProductsSummary,
  updateProductById,
} from "../controllers/productController.js";

import { upload } from "../multer/multer.js";
import { validateID, validateProduct, validateSlug } from "../validators/productValidator.js";
import { validate } from "../middlewares/productValidate.js";
import { protect } from "../middlewares/authMiddleware.js";
const productRoutes = express.Router();



// Create a new Product
productRoutes.post(
  "/",
  validateProduct,
  validate,
  createProduct
);

// Get all Products
productRoutes.get("/", getAllProducts);


//Get Products Summary
productRoutes.get('/summary',getProductsSummary)

// Get Collections
productRoutes.get('/collections',getCollections)

// Get Filter Options
productRoutes.get("/filters/options", getAvailableFilterOptions);

// Get Products by filtering the attributes
productRoutes.get("/filter/search", getFilteredProductsByOption);

// Get product by ID
productRoutes.get(
  "/:id",
  validateID,
  validate,
  getProductByID
);

// Get product by slug
productRoutes.get(
  "/slug/:slug",
  validateSlug,
  validate,
  getProductBySlug
);


// Delete All Products

productRoutes.delete("/",protect(['superAdmin']), deleteAllProducts);

// Delete Product by id
productRoutes.delete(
  "/:id",
  validateID,
  validate,
  protect(['superAdmin']),
  deleteProductById
);

// Update by id

productRoutes.put(
  "/:id",
  validateProduct,
  validate,
  protect(['admin','superAdmin']),
  updateProductById
);






export default productRoutes;
