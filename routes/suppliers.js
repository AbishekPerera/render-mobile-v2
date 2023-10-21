import express from "express";
const supplierRouter = express.Router();
import Supplier from "../models/supplier.js";

//get all suppliers
supplierRouter.get("/", async (req, res) => {
  try {
    //get supliers without password
    const suppliers = await Supplier.find({}, { password: 0 });

    res.status(200).json({
      state: true,
      results: suppliers,
    });
  } catch (err) {
    res.status(500).json({
      state: false,
      results: "Suppliers Fetch Failed!",
    });
  }
});

export default supplierRouter;
