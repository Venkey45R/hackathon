import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeCustomer() {
  const navigate = useNavigate();

  useEffect(()=>{
    const role = localStorage.getItem('role');
    if(role !== "customer"){
      navigate('/');
    }
  },[])
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar - white background */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-green-700">AgriDirect</h1>
        <div className="space-x-3">
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 font-semibold text-white transition bg-green-700 rounded-lg hover:bg-green-800"
          >
            View Products
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="px-4 py-2 font-semibold text-white transition bg-green-700 rounded-lg hover:bg-green-800"
          >
            View Orders
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content - light green background */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center bg-green-50">
        <h2 className="mb-4 text-4xl font-bold text-green-800">Welcome to AgriDirect!</h2>
        <p className="max-w-xl text-lg text-gray-700">
          Explore farm-fresh products, manage your orders, and support your local farmers — all in one place.
        </p>
      </main>
    </div>
  );
}

export default HomeCustomer;
