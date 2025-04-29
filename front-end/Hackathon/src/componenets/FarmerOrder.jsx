import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FarmerOrder() {
  const [orders, setOrders] = useState([]);
  const farmerId = localStorage.getItem("id");

  useEffect(() => {
    fetchOrders();
  }, [farmerId]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`https://hackathon-backend-5oqz.onrender.com/farmer-orders/${farmerId}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching farmer orders:", error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.patch(`http://localhost:3000/order/${orderId}/status`, { status });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const statusColor = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Accepted: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Optional Navbar */}
      {/* <Navbar /> */}

      <div className="px-6 py-10">
        <h2 className="mb-8 text-3xl font-bold text-center text-green-900">📬 Orders Received</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders received yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-6 transition bg-white border border-green-100 shadow-lg rounded-xl hover:shadow-2xl"
              >
                {/* Product Image */}
                {order.productId?.imageUrl && (
                  <img
                    src={order.productId.imageUrl}
                    alt={order.productId.name}
                    className="object-cover w-full h-40 mb-4 rounded-md"
                  />
                )}

                {/* Product Info */}
                <h3 className="text-xl font-semibold text-green-800">{order.productId?.name}</h3>
                <p className="mt-1 text-sm text-gray-700"><strong>Customer:</strong> {order.customerId?.name}</p>
                <p className="text-sm text-gray-700"><strong>Quantity:</strong> {order.quantity}</p>
                <p className="text-sm text-gray-700"><strong>Total Price:</strong> ₹{order.totalAmount}</p>
                <p className="text-sm text-gray-700"><strong>Delivery Address:</strong> {order.deliveryAddress}</p>

                {/* Status */}
                <p className="mt-2 text-sm">
                  <strong>Status:</strong>{' '}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.status || "Pending"]}`}>
                    {order.status || "Pending"}
                  </span>
                </p>

                {/* Timestamp */}
                <p className="mt-1 text-xs text-gray-500">
                  Ordered At: {new Date(order.createdAt).toLocaleString()}
                </p>

                {/* Action Buttons */}
                {order.status === "pending" && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => updateStatus(order._id, "Accepted")}
                      className="w-full py-2 text-sm font-semibold text-white transition bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "Rejected")}
                      className="w-full py-2 text-sm font-semibold text-white transition bg-red-500 rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmerOrder;
