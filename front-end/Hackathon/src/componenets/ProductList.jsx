import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Navbar
const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 text-green-800 bg-white shadow">
    <h1 className="text-2xl font-bold">AgriDirect</h1>
    <div className="space-x-4">
      <Link to="/home" className="hover:underline">Home</Link>
      <Link to="/products" className="hover:underline">Products</Link>
      <Link to="/orders" className="hover:underline">My Orders</Link>
      <Link to="/" onClick={() => localStorage.clear()} className="text-red-500 hover:underline">Logout</Link>
    </div>
  </nav>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search, location, and price
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesLocation = locationFilter === "All" || product.location === locationFilter;
    const matchesPrice =
      priceFilter === "All" ||
      (priceFilter === "Below ₹50" && product.price < 50) ||
      (priceFilter === "₹50 - ₹100" && product.price >= 50 && product.price <= 100) ||
      (priceFilter === "Above ₹100" && product.price > 100);

    return matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-10 bg-green-50">
        <h2 className="mb-8 text-4xl font-bold text-center text-green-800">🌾 Explore Fresh Produce</h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-1/3 px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 sm:w-1/4"
          />

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-1/3 px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 sm:w-1/4"
          >
            <option value="All">All Locations</option>
            {/* Dynamic location options */}
            {[...new Set(products.map((product) => product.location))].map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-1/3 px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 sm:w-1/4"
          >
            <option value="All">All Prices</option>
            <option value="Below ₹50">Below ₹50</option>
            <option value="₹50 - ₹100">₹50 - ₹100</option>
            <option value="Above ₹100">Above ₹100</option>
          </select>
        </div>

        {/* Product Cards */}
        {filteredProducts.length === 0 ? (
          <p className="mt-12 text-center text-gray-500">No products found matching the criteria.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="p-4 transition duration-200 ease-in-out transform bg-white border border-green-100 shadow-md rounded-xl hover:shadow-lg hover:scale-105"
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
                <Link
                  to={`/product/${product._id}`}
                  className="inline-block w-full px-4 py-2 text-center text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
