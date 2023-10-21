import express from "express";
const orderRouter = express.Router();
import Order from "../models/order.js";
import mongoose from "mongoose";

//add new Order
orderRouter.route("/add").post((req, res) => {
  const supplierId = req.body.supplierId;
  const supplierName = req.body.supplierName;
  const siteName = req.body.siteName;
  const siteAddress = req.body.siteAddress;
  const expectedDate = req.body.expectedDate;
  const products = req.body.products;
  const siteManagerId = req.body.siteManagerId;
  //   const mainStatus = req.body.mainStatus;

  const newOrder = new Order({
    supplierId,
    supplierName,
    siteManagerId,
    siteName,
    siteAddress,
    expectedDate,
    products,
    // mainStatus,
  });

  newOrder
    .save()
    .then(() => {
      res.status(200).json({
        state: true,
        // return inserted data
        results: newOrder,
      });
    })
    .catch((err) => {
      res.status(500).json({
        state: false,
        results: "Order Added Failed!",
      });
    });
});

//get all orders
orderRouter.route("/").get((req, res) => {
  Order.find()
    .then((orders) => {
      res.status(200).json({
        state: true,
        results: orders,
      });
    })
    .catch((err) => {
      res.status(500).json({
        state: false,
        results: "Order Fetch Failed!",
      });
    });
});

//get order by id
orderRouter.route("/:id").get((req, res) => {
  let orderId = req.params.id;

  Order.findById(orderId)
    .then((order) => {
      res.status(200).json({
        state: true,
        results: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        state: false,
        results: "Order Fetch Failed!",
      });
    });
});

//update order by id
orderRouter.route("/update/:id").put(async (req, res) => {
  let orderId = req.params.id;
  const supplierId = req.body.supplierId;
  const supplierName = req.body.supplierName;
  const siteManagerId = req.body.siteManagerId;
  const siteName = req.body.siteName;
  const siteAddress = req.body.siteAddress;
  const expectedDate = req.body.expectedDate;
  const products = req.body.products;
  const mainStatus = req.body.mainStatus;

  //check if order main status
  const order = await Order.findById(orderId);
  if (order.mainStatus != "Pending") {
    res.status(200).json({
      state: false,
      results: "Order Update Failed! Order is not in Pending Status!",
    });
    return;
  }

  const updateOrder = {
    supplierId,
    supplierName,
    siteManagerId,
    siteName,
    siteAddress,
    expectedDate,
    products,
  };

  const updatedOrder = await Order.findByIdAndUpdate(orderId, updateOrder)
    .then(() => {
      res.status(200).json({
        state: true,
        results: updateOrder,
      });
    })
    .catch((err) => {
      res.status(500).json({
        state: false,
        results: "Order Update Failed!" + err,
      });
    });
});

//delete order by id
orderRouter.route("/delete/:id").delete(async (req, res) => {
  let orderId = req.params.id;

  //check if order main status
  const order = await Order.findById(orderId);

  //check if response is null
  if (!order) {
    res.status(200).json({
      state: false,
      results: "Order Delete Failed! Order not found!",
    });
    return;
  }

  if (order.mainStatus != "Pending") {
    res.status(200).json({
      state: false,
      results: "Order Delete Failed! Order is not in Pending Status!",
    });
    return;
  }

  await Order.findByIdAndDelete(orderId)
    .then(() => {
      res.status(200).json({
        state: true,
        results: "Order Deleted Successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        state: false,
        results: "Order Delete Failed!",
      });
    });
});

//get orders by site manager id
orderRouter.route("/siteManager/:id").get((req, res) => {
  let siteManagerId = req.params.id;
  Order.find({ siteManagerId: siteManagerId })
    .then((orders) => {
      res.status(200).json({
        state: true,
        results: orders,
      });
    })
    .catch((err) => {
      res.status(500).json({
        state: false,
        results: "Order Fetch Failed!",
      });
    });
});

//update main status of an order
orderRouter.route("/main-status/:id").put(async (req, res) => {
  let orderId = req.params.id;
  const mainStatus = req.body.mainStatus;

  const updateOrder = {
    mainStatus,
  };

  const updatedOrder = await Order.findByIdAndUpdate(orderId, updateOrder)
    .then(() => {
      res.status(200).json({
        state: true,
        results: updateOrder,
      });
    })
    .catch((err) => {
      res.status(500).json({
        state: false,
        results: "Order Update Failed!" + err,
      });
    });

  return updatedOrder;
});

// update each product status by for an order
orderRouter.route("/products-status/:id").put(async (req, res) => {
  const orderId = req.params.id;
  const { selectedProducts } = req.body;

  const selectedProductIds = selectedProducts.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    selectedProductIds.forEach((productToUpdate) => {
      const product = order.products.find(
        (p) => p._id.toString() === productToUpdate.toString()
      );

      if (product) {
        product.status = true;
      }
    });

    await order.save();
    return res.status(200).json({ message: "Products updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating products" });
  }
});

export default orderRouter;
