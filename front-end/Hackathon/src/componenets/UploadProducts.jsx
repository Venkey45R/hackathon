import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    imageUrl: ""
  });
  const [location, setLocation] = useState(""); // 👈 Track location

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "farmer") {
      navigate("/");
      return;
    }

    const farmerId = localStorage.getItem("id");

    if (!farmerId) return;

    // 👇 Fetch farmer data to get location
    const fetchFarmer = async () => {
      try {
        const res = await axios.get(`https://hackathon-backend-5oqz.onrender.com/farmer/${farmerId}`);
        setLocation(res.data.location);
      } catch (err) {
        console.error("Error fetching farmer info:", err);
      }
    };

    fetchFarmer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const farmerId = localStorage.getItem("id");
    if (!farmerId || !location) {
      alert("Farmer data missing. Please try logging in again.");
      return;
    }

    try {
      const res = await fetch("https://hackathon-backend-5oqz.onrender.com/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, farmerId, location }) // 👈 include location
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product uploaded successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          quantity: "",
          category: "",
          imageUrl: ""
        });
      } else {
        alert("Upload failed: " + data.message || "Server error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-green-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 space-y-4 bg-white rounded shadow-md">
        <h1 className="my-5 text-2xl font-bold text-center text-green-600">Upload Product</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* 👇 Displaying auto-fetched location */}
        {location && (
          <p className="text-sm text-green-600">Location: {location}</p>
        )}

        <button type="submit" className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700">
          Upload
        </button>
      </form>
    </div>
  );
}
