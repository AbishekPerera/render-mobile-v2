import mongoose from "mongoose";
const Schema = mongoose.Schema;

// materials {"_id":{"$oid":"652b5fc5901519a57e1bd30c"},"name":"Mattle","description":"Mattle","availableQuantity":{"$numberInt":"80"},"unitType":"cube","unitPrice":{"$numberInt":"500"},"supplierId":"652b02fe5ae0596c4fbe00be","supplierName":"Kavi","__v":{"$numberInt":"0"}}

const materialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
  unitType: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  supplierId: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
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

const Material = mongoose.model("Material", materialSchema);

export default Material;
