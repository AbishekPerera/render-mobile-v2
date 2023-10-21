// {"_id":{"$oid":"6529a53868f1863d199d82e2"},"orderId":"12345","products":[{"name":"Product 1","unitPrice":{"$numberInt":"10"},"quantity":{"$numberInt":"2"},"total":{"$numberInt":"20"},"_id":{"$oid":"6529a6c54c58d6bbffb706b5"}},{"name":"Product 2","unitPrice":{"$numberInt":"15"},"quantity":{"$numberInt":"3"},"total":{"$numberInt":"45"},"_id":{"$oid":"6529a6c54c58d6bbffb706b6"}}],"totalPrice":{"$numberInt":"65"},"status":"Approved","date":{"$date":{"$numberLong":"1697228089001"}},"__v":{"$numberInt":"0"}}
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
