import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    contact: "",
    location: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://hackathon-backend-5oqz.onrender.com/signup", user);
      if (res.status === 201) {
        showAlert("Signup successful! Please log in.", "success");
        setTimeout(() => navigate("/signin"), 1500);
      }
      if(res.status === 400){
        showAlert("User already exists");
      }
    } catch (error) {
      console.error("User already exists");
      showAlert("User aleady exists", "error");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-green-100">
      {/* Alert Box */}
      {alert.message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg text-white text-center transition-all duration-500 ${
            alert.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Form Container */}
      <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-green-800">
          Create Your AgriDirect Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="customer">Customer</option>
            <option value="farmer">Farmer</option>
          </select>
          <input
            type="text"
            name="contact"
            value={user.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleChange}
            placeholder="Your Location"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-green-700 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
