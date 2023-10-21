import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

const PORT = process.env.PORT || 8075;
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

//routes-----------------------------------------------------------------

//add site manager
import sitemanagerRouter from "./routes/sitemanagers.js";
app.use("/sitemanager", sitemanagerRouter);

//add order
import orderRouter from "./routes/orders.js";
app.use("/order", orderRouter);

//products
import productRouter from "./routes/products.js";
app.use("/product", productRouter);

//suppliers
import supplierRouter from "./routes/suppliers.js";
app.use("/supplier", supplierRouter);

//get invoices
import invoiceRouter from "./routes/invoices.js";
app.use("/invoice", invoiceRouter);
