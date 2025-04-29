const mongoose = require("mongoose");
// Order model (schema example)
const OrderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assuming "customerId" references the user
    status: { type: String, default: 'pending' },
    quantity: Number,
    totalAmount: Number,
    deliveryAddress: String,
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model("Order", OrderSchema);
