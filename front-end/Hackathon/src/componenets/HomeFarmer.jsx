import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FarmerHome() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "farmer") {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full">
      <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-9xl">
          <h1 className="text-2xl font-bold text-green-700">AgriDirect - {t("farmer")}</h1>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="items-center hidden space-x-6 md:flex">
            <Link to="/upload-product" className="font-medium hover:text-green-700">{t("upload_product")}</Link>
            <Link to="/farmerorder" className="font-medium hover:text-green-700">{t("view_orders")}</Link>
            <Link to="/update-products" className="font-medium hover:text-green-700">{t("update_products")}</Link>
            <Link to="/">
              <button className="px-4 py-2 text-white transition bg-red-600 rounded-md hover:bg-red-700 hover:scale-105">
                {t("logout")}
              </button>
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className="flex flex-col items-center px-6 pb-4 space-y-3 bg-white shadow-md md:hidden">
            <Link to="/upload-product" onClick={() => setMenuOpen(false)}>{t("upload_product")}</Link>
            <Link to="/farmerorder" onClick={() => setMenuOpen(false)}>{t("view_orders")}</Link>
            <Link to="/update-products" onClick={() => setMenuOpen(false)}>{t("update_products")}</Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="font-medium text-red-600">{t("logout")}</Link>
          </div>
        )}
      </nav>

      <section className="flex flex-col items-center justify-center h-screen px-6 pt-20 text-center bg-green-100">
        <h2 className="mb-6 text-4xl font-bold text-green-800 md:text-5xl">{t("welcome_farmer")}</h2>
        <p className="max-w-2xl mb-8 text-lg text-gray-700">{t("farmer_description")}</p>
        <Link to="/upload-product">
          <button className="px-8 py-3 text-lg text-white transition bg-green-700 rounded-xl hover:bg-green-800 hover:scale-105">
            {t("upload_product")}
          </button>
        </Link>
      </section>
    </div>
  );
}
