import { Link } from "react-router-dom";
import Hero from '../assets/hero.jpeg';

export default function Home() {
  return (
    <div className="w-full scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-green-700">AgriDirect</h1>
        <div className="space-x-10">
          <Link to="/signin">
            <button className="px-5 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-5 py-2 text-green-700 border border-green-600 rounded-lg hover:bg-green-100">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <section className="flex flex-col-reverse items-center justify-between min-h-screen px-6 py-20 bg-green-100 md:flex-row">
  {/* Text Content */}
  <div className="w-full mt-10 ml-10 text-center md:w-1/2 md:mt-0 md:text-left">
    <h1 className="mb-6 text-4xl font-bold leading-snug text-green-800 md:text-5xl">
      Grow Together with AgriDirect
    </h1>
    <p className="max-w-xl mx-auto mb-6 text-lg text-gray-700 md:text-xl md:mx-0">
      Connect directly with farmers for fresh produce and fair prices. Empower agriculture — one click at a time.
    </p>
    <button className="px-6 py-3 text-base text-white transition bg-green-600 rounded-lg shadow hover:bg-green-700 md:text-lg">
      Explore Products
    </button>
  </div>

  {/* Hero Image */}
  <div className="flex justify-center w-full md:w-1/2">
    <img
      src={Hero}
      alt="AgriDirect Hero"
      className="w-full max-w-xs shadow-lg md:max-w-md rounded-xl"
    />
  </div>
</section>

      {/* Section 2: Features */}
      <section className="flex flex-col items-center justify-center h-screen px-6 text-center bg-white">
        <h2 className="mb-8 text-4xl font-bold text-green-800">Features</h2>
        <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 transition border shadow-md rounded-2xl hover:scale-105 bg-green-50">
            <h3 className="mb-2 text-xl font-semibold">🌱 Farmer Product Upload</h3>
            <p>Farmers can add fresh produce details with ease — including name, quantity, and price.</p>
          </div>
          <div className="p-6 transition border shadow-md rounded-2xl hover:scale-105 bg-green-50">
            <h3 className="mb-2 text-xl font-semibold">🛒 Customer Orders</h3>
            <p>Customers can browse all products and place orders. No payment needed — just order!</p>
          </div>
          <div className="p-6 transition border shadow-md rounded-2xl hover:scale-105 bg-green-50">
            <h3 className="mb-2 text-xl font-semibold">📦 Order History</h3>
            <p>Track all orders placed or received from the user’s and farmer’s orders page.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action + Contact */}
<section className="flex flex-col items-center justify-center h-screen px-6 text-center bg-green-200">
  <h2 className="mb-6 text-4xl font-bold text-green-900">Get Started Today!</h2>
  <p className="max-w-xl mb-10 text-lg text-gray-800">
    Whether you're a farmer or customer, join AgriDirect to simplify selling and buying fresh products.
  </p>

  <div className="mb-10 space-x-6">
    <a href="#contact" className="px-8 py-3 text-white bg-yellow-500 rounded-xl hover:bg-yellow-600">
      Contact Us
    </a>
  </div>

  {/* Contact Info */}
  <div id="contact" className="flex flex-col items-center">
    <p className="mb-4 text-gray-700 text-md">📧 For queries, email us</p>
    
    <div className="flex space-x-4 text-2xl text-green-900">
      <a href="https://linkedin.com" target="_blank" rel="noreferrer">
        <i className="fab fa-linkedin hover:text-green-700"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer">
        <i className="fab fa-twitter hover:text-green-700"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">
        <i className="fab fa-instagram hover:text-green-700"></i>
      </a>
    </div>
  </div>
</section>

    </div>
  );
}
