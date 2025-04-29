require('dotenv').config()

const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./model/Users');
const jwt = require('jsonwebtoken');
const productModel = require('./model/Products');
const Order = require('./model/Orders');
const authMiddleware = require('./authMiddleware');
const sendFarmerMail = require('./mail_farmer');
const sendCustomerMail = require('./mail_customer');

const app = express();


app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/dma");

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, contact, location } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      contact,
      location,
    });

    const access_token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Inserted successfully",
      role: newUser.role,
      id: newUser._id,
      token: access_token,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json("Internal server error");
  }
});

app.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const customerId = req.user.id; // or req.user._id if you store it that way

    const orders = await Order.find({ customerId })
      .populate('productId', 'name price imageUrl')
      .populate('farmerId', 'name contact location');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching customer orders:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/signin', async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        res.json("user not found");
    }
    else{
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json("Incorrect password");
        }
        const access_token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        
        res.json({message: "success", role: user.role, id: user._id, token: access_token});
    }
})

app.post('/upload', async (req, res) => {
  try {
    const { name, description, price, quantity, category, location, imageUrl, farmerId } = req.body;

    const newProduct = await productModel.create({
      name,
      description,
      price,
      quantity,
      category,
      imageUrl,
      location,
      farmerId // coming directly from frontend
    });

    res.status(201).json({ message: 'Product uploaded successfully', product: newProduct });
  } catch (error) {
    console.error('Upload product error:', error.message);
    res.status(500).json('Internal server error while uploading');
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get product' });
  }
});

// Update product by ID
app.put('/update-product/:id', async (req, res) => {
  try {
    console.log()
    const updated = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.get('/products/:id', async(req, res)=>{
  try {
    const product = await productModel.findById(req.params.id).populate('farmerId', 'name contact location email');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product details:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/farmer-products/:id', (req, res)=>{
  productModel.find({farmerId: req.params.id}).then((products)=>{
    res.json(products);
  })
})

app.post('/orders', async (req, res) => {
  try {
    const { productId, quantity, totalAmount, deliveryAddress, customerId } = req.body;

    if (!productId || !quantity || !totalAmount || !deliveryAddress) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const product = await productModel.findById(productId).populate('farmerId'); // populate farmerId
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newOrder = new Order({
      productId,
      quantity,
      totalAmount,
      customerId,
      deliveryAddress,
      farmerId: product.farmerId._id,
    });

    await newOrder.save();

    // Reduce product quantity
    product.quantity -= quantity;
    await product.save();

    // Now get farmer's email dynamically
    const farmerEmail = product.farmerId.email;
    const productName = product.name;

    await sendFarmerMail(
      farmerEmail,
      "New Order Received!",
      `<h1>You just received an order for <b>${productName}</b>. Please respond quickly!</h1><p>Agri Direct - 2025</p>`
    );

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});


app.get('/my-orders/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const orders = await Order.find({ customerId })
      .populate('productId', 'name price imageUrl')
      .populate('farmerId', 'name contact location');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching customer orders:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/delete-order/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err.message);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

app.get("/farmer/:id", async (req, res) => {
  try {
    const farmer = await userModel.findById(req.params.id); // Using userModel to find farmer
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // If the farmer is found, return the farmer data (including location)
    res.status(200).json(farmer);  // Assuming location is part of the farmer's user document
  } catch (err) {
    console.error("Error fetching farmer:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/farmer-orders/:farmerId', async (req, res) => {
  try {
    const farmerId = req.params.farmerId;
    
    const orders = await Order.find({ farmerId })
      .populate('productId', 'name price imageUrl')
      .populate('customerId', 'name email contact location');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching farmer orders:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch('/order/:id/status', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('customerId'); // populate customerId to get email

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const customerEmail = updatedOrder.customerId.email;

    await sendCustomerMail(
      customerEmail,
      `Farmer ${status} to your order!`,
      `<h1>Check out your order details!</h1><p>Agri Direct - 2025</p>`
    );

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json("You are not authenticated");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Invalid Token");
    }

    // Save full payload (with id and email) to req.user
    req.user = user;
    next();
  });
}


app.listen(port, () =>{
    console.log(`server running in port ${port}`);
})