import express from "express";
const invoiceRouter = express.Router();
import Invoice from "../models/invoice.js";

//get all invoices
invoiceRouter.route("/").get((req, res) => {
  Invoice.find()
    .then((invoices) => {
      res.status(200).json({
        state: true,
        results: invoices,
      });
    })
    .catch((err) => {
      res.status(500).json({
        state: false,
        results: "Invoice Fetch Failed!",
      });
    });
});

export default invoiceRouter;
