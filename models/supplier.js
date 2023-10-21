import mongoose from "mongoose";
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  nic: {
    type: String,
  },
  password: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
