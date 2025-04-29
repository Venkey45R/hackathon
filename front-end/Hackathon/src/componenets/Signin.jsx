import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showAlert("Enter all fields to continue", "error");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/signin', { email, password });
      if (res.data.message === "success") {
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('access_token', res.data.token);
        showAlert("Signin successful! Redirecting...", "success");
        setTimeout(() => {
          if (res.data.role === "farmer") {
            navigate('/homepage');
          } else {
            navigate('/home');
          }
        }, 1500);
      } else {
        showAlert(res.data, "error");
      }
    } catch (error) {
      console.error("Signin Error:", error);
      showAlert("Invalid email or password.", "error");
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

      {/* Form Box */}
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-green-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-green-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-green-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition rounded-md bg-emerald-600 hover:bg-emerald-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-green-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-emerald-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
