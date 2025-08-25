// Create Product

import Product from "../models/Product.js";
import { errors, success } from "../utils/responses.js";

import fs from "fs";


export const createProduct = async (req, res) => {
  try {
    let data = req.body;

    data.stock = parseInt(data.stock) || 0;
    if (data.variants && Array.isArray(data.variants)) {
      data.variants = data.variants.map((v) => ({
        weight: v.weight,
        price: parseFloat(v.price) || 0,
      }));
    }

 

    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/\s+/g, "-");
    }

  
    const existingProduct = await Product.findOne({
      $or: [{ name: data.name }, { slug: data.slug }],
    });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message:
          existingProduct.name === data.name
            ? "Product name already exists"
            : "Product slug already exists",
      });
    }

    const product = await Product.create(data);
    return res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Fetching all Products

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const skip = (page - 1) * limit;

    const products = await Product.aggregate([
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } }, 
            { $skip: skip },
            { $limit: limit },
          ],
          count: [{ $count: "total" }],
        },
      },
    ]);

    const total = products[0].count[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      data: products[0].data,
      page,
      total,
      totalPages,
      message: "Products retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//Get Products Summary
export const getProductsSummary = async (req, res) => {
  try {
    const summary = await Product.aggregate([
      {
        $facet: {
          totalProducts: [{ $count: "count" }],
          distinctCollections: [
            { $unwind: "$attributes.collections" },
            { $group: { _id: null, collections: { $addToSet: "$attributes.collections" } } },
          ],
          totalStock: [
            { $group: { _id: null, stock: { $sum: "$stock" } } }
          ],
        },
      },
      {
        $project: {
          totalProducts: { $arrayElemAt: ["$totalProducts.count", 0] },
          collections: { $arrayElemAt: ["$distinctCollections.collections", 0] },
          totalStock: { $arrayElemAt: ["$totalStock.stock", 0] },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: summary[0],
      message: success.PRODUCTS_RETRIEVED,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get product by ID
export const getProductByID = async (req, res) => {
  try {
    let { id } = req.params;

    let product = await Product.findById(id);

    if (product) {
      return res.status(200).json({
        success: true,
        data: product,
        message: success.PRODUCT_RETRIEVED,
      });
    }
    return res.status(400).json({
      success: false,
      data: null,
      message: errors.INVALID_PRODUCT_ID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Products by Slag

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug: slug.toLowerCase() });

    if (!product) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Invalid product slug",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: success.PRODUCT_RETRIEVED || "Product retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Filter Products

export const getFilteredProductsByOption = async (req, res) => {
  try {
    let filteredQuery = req.query;
    let query = {};

    if (filteredQuery.caffeine) {
      query.caffeine = filteredQuery.caffeine;
    }
    if (filteredQuery.organic) {
      query.organic = filteredQuery.organic === "true";
    }

    const attributes = [
      "collections",
      "origin",
      "flavor",
      "qualities",
      "allergies",
    ];

    attributes.forEach((key) => {
      if (filteredQuery[key]) {
        query[`attributes.${key}`] = filteredQuery[key];
      }
    });

    const products = await Product.find(query);

    return res.status(200).json({
      success: true,
      data: products,
      message:
        products.length > 0
          ? success.PRODUCTS_RETRIEVED
          : errors.PRODUCT_NOT_FOUND,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Filter Options

export const getAvailableFilterOptions = async (req, res) => {
  try {
    const attributes = await Product.aggregate([
      {
        $project: {
          attributes: { $objectToArray: "$attributes" },
        },
      },
      { $unwind: "$attributes" },
      { $unwind: "$attributes.v" },
      {
        $group: {
          _id: "$attributes.k",
          values: { $addToSet: "$attributes.v" },
        },
      },
    ]);

    const caffeineLevels = await Product.distinct("caffeine");
    const organicValues = await Product.distinct("organic");

    res.json({ attributes, caffeineLevels, organicValues });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete all products

export const deleteAllProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    return res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
      message: "All products have been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete by Id
export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }


    await product.deleteOne();

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update By ID

export const updateProductById = async (req, res) => {
  try {
    let data = req.body;
    console.log(data)
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

 

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get collections

export const getCollections = async (req, res) => {
  try {
    const collections = await Product.aggregate([
      {
        $unwind: "$attributes.collections", // break array into separate docs
      },
      {
        $group: {
          _id: "$attributes.collections", // group by collection name
          productId: { $first: "$_id" }, // pick first product
          name: { $first: "$name" }, // pick first product name
          image: { $first: { $arrayElemAt: ["$images", 0] } }, // pick first image
        },
      },
      {
        $project: {
          _id: 0,
          collection: "$_id",
          productId: 1,
          name: 1,
          image: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      collections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch collections",
      error: error.message,
    });
  }
};
