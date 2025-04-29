import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    axios.get(`http://localhost:3000/farmer-products/${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch farmer products:', err);
      });
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-green-50">
      <h2 className="mb-8 text-4xl font-bold text-center text-green-800">🛠️ Manage Your Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 transition duration-200 ease-in-out bg-white border border-green-100 shadow-md rounded-xl hover:shadow-lg"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-48 mb-4 rounded-xl"
              />
              <h3 className="mb-1 text-xl font-semibold text-green-900">{product.name}</h3>
              <p className="mb-2 text-sm text-gray-600 line-clamp-3">{product.description}</p>
              <p className="mb-1 font-medium text-green-700">Price: ₹{product.price}</p>
              <p className="mb-1 text-sm text-gray-700">Quantity: {product.quantity}</p>
              <p className="mb-3 text-sm text-gray-500">Location: {product.location}</p>
              <button
                onClick={() => navigate(`/update-form/${product._id}`)}
                className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Update Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpdateProducts;
