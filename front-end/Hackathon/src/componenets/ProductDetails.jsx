import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen px-4 py-10 bg-green-50">
      <div className="max-w-4xl p-8 mx-auto bg-white shadow-xl rounded-2xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-green-900">Product Details</h2>

        {/* Image */}
        {product.imageUrl && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-64 shadow rounded-xl"
            />
          </div>
        )}

        {/* Product and Farmer Info */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Product Info */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-green-800">Product Info</h3>
            <table className="w-full text-green-800 border-separate border-spacing-y-3">
              <tbody>
                <tr>
                  <th className="text-left">Name:</th>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <th className="text-left">Description:</th>
                  <td>{product.description}</td>
                </tr>
                <tr>
                  <th className="text-left">Price:</th>
                  <td>₹{product.price}</td>
                </tr>
                <tr>
                  <th className="text-left">Quantity:</th>
                  <td>{product.quantity}</td>
                </tr>
                <tr>
                  <th className="text-left">Category:</th>
                  <td>{product.category}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Farmer Info */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-green-800">Farmer Info</h3>
            <table className="w-full text-green-800 border-separate border-spacing-y-3">
              <tbody>
                <tr>
                  <th className="text-left">Name:</th>
                  <td>{product.farmerId.name}</td>
                </tr>
                <tr>
                  <th className="text-left">Email:</th>
                  <td>{product.farmerId.email}</td>
                </tr>
                <tr>
                  <th className="text-left">Contact:</th>
                  <td>{product.farmerId.contact}</td>
                </tr>
                <tr>
                  <th className="text-left">Location:</th>
                  <td>{product.farmerId.location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate(`/order/${product._id}`)}
            className="px-6 py-3 font-semibold text-white transition duration-200 bg-green-600 rounded-xl hover:bg-green-700"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
