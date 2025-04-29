import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: '',
    location: ''
  });

  useEffect(() => {
    axios.get(`https://hackathon-backend-5oqz.onrender.com/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://hackathon-backend-5oqz.onrender.com/update-product/${id}`, product);
      alert("Product updated successfully!");
      navigate('/update-products');
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-green-50">
      <h2 className="mb-8 text-3xl font-bold text-center text-green-800">✏️ Update Product Details</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl p-6 mx-auto space-y-4 bg-white rounded-lg shadow-md"
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        
        <label>Descrption</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          rows="4"
          required
        />
        
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Available Quantity"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />  
        
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={product.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        
        <label>Image URL</label>
        <input  
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
