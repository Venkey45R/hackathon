import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('id');

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`https://hackathon-backend-5oqz.onrender.com/my-orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://hackathon-backend-5oqz.onrender.com/delete-order/${orderId}`);
      alert("Order deleted successfully.");
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="p-6">
        <h2 className="mb-8 text-3xl font-bold text-center text-green-900">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div key={order._id} className="p-6 transition bg-white shadow-lg rounded-xl hover:shadow-2xl">
                <img
                  src={order.productId.imageUrl}
                  alt={order.productId.name}
                  className="object-cover w-full h-48 mb-4 rounded-lg shadow-md"
                />
                <h3 className="text-2xl font-semibold text-green-800">{order.productId.name}</h3>
                <p className="mt-2 text-sm text-gray-700"><strong>Quantity:</strong> {order.quantity}</p>
                <p className="text-sm text-gray-700"><strong>Total Price:</strong> ₹{order.totalAmount}</p>
                <p className="text-sm text-gray-700"><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                <p className="text-sm text-gray-700"><strong>Status:</strong> {order.status || "Pending"}</p>

                <p className="mt-3 text-xs text-gray-600">
                  <strong>Farmer:</strong> {order.farmerId.name}
                  <span className="text-gray-500"> ({order.farmerId.contact}, {order.farmerId.location})</span>
                </p>

                {/* Show delete button only if status is pending */}
                {order.status?.toLowerCase() === 'pending' && (
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="px-4 py-2 mt-4 text-sm text-white transition bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
