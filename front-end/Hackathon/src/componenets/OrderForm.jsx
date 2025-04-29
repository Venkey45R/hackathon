import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrderForm() {
  const { id } = useParams(); // product ID
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const cust_id = localStorage.getItem("id");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };
    fetchProduct();
  }, [id]);
  const handleOrder = async (e) => {
    e.preventDefault();
  
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }
  
    const orderData = {
      productId: product._id,
      quantity: quantity,
      totalAmount: product.price * quantity,
      deliveryAddress: address,
      customerId: cust_id,
    };
  
    try {
      const token = localStorage.getItem("access_token"); // Make sure token exists
      const response = await axios.post("http://localhost:3000/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("Order placed successfully!");
      navigate("/orders"); // Optional: navigate to orders page
    } catch (err) {
      console.error("Error placing order", err.response?.data || err.message);
      alert("Failed to place order. Try again.");
    }
  };
  
  
  if (!product) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen py-10 bg-green-50">
      <div className="max-w-xl p-8 mx-auto bg-white shadow-md rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-green-800">Place Your Order</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-green-700">{product.name}</h3>
          <p className="mt-2 text-gray-700">{product.description}</p>
          <p className="mt-2 font-medium text-gray-800">Price per unit: ₹{product.price}</p>
        </div>

        <form onSubmit={handleOrder} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800">Quantity</label>
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="text-lg font-semibold text-green-700">
            Total Price: ₹{product.price * quantity}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-green-700 rounded-lg hover:bg-green-800"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
