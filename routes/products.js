import express from "express";
const productRouter = express.Router();
import Material from "../models/product.js";

//get all products
productRouter.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json({
      state: true,
      results: materials,
    });
  } catch (err) {
    res.status(500).json({
      state: false,
      results: "Products Fetch Failed!",
    });
  }
});

//get ll products by supplier id
productRouter.get("/supplier/:supplierId", async (req, res) => {
  try {
    const materials = await Material.find({
      supplierId: req.params.supplierId,
    });
    res.status(200).json({
      state: true,
      results: materials,
    });
  } catch (err) {
    res.status(500).json({
      state: false,
      results: "Products Fetch Failed!",
    });
  }
});

export default productRouter;
