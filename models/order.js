import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  supplierId: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  siteManagerId: {
    type: String,
    required: true,
  },
  siteName: {
    type: String,
    required: true,
  },
  siteAddress: {
    type: String,
    required: true,
  },
  expectedDate: {
    type: Date,
    required: true,
  },
  products: [
    {
      pName: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      units: {
        type: String,
        required: true,
      },
      pricePer: {
        type: Number,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      },
    },
  ],
  mainStatus: {
    type: String,
    default: "Pending",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
