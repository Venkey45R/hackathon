import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher"; // Import LanguageSwitcher

function HomeCustomer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "customer") {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-green-700">AgriDirect</h1>
        <div className="space-x-3">
          <button
            onClick={() => navigate("/products")}
            className="px-5 py-2 text-white transition-all bg-green-700 rounded-lg shadow hover:bg-green-800 hover:scale-105"
          >
            {t("view_products")}
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="px-5 py-2 text-white transition-all bg-green-700 rounded-lg shadow hover:bg-green-800 hover:scale-105"
          >
            {t("view_orders")}
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 text-white transition-all bg-red-500 rounded-lg shadow hover:bg-red-600 hover:scale-105"
          >
            {t("logout")}
          </button>
        </div>
        <LanguageSwitcher /> {/* Add the language switcher here */}
      </nav>

      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center bg-green-50">
        <h2 className="mb-4 text-4xl font-bold text-green-800">{t("welcome_customer")}</h2>
        <p className="max-w-xl text-lg text-gray-700">
          {t("customer_description")}
        </p>
      </main>
    </div>
  );
}

export default HomeCustomer;
