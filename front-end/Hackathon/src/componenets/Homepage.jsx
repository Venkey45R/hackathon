import { Link } from "react-router-dom";
import Hero from '../assets/hero.jpeg';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="w-full scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-green-700">{t('app.title')}</h1>
        <LanguageSwitcher />
        <div className="space-x-10">
          <Link to="/signin">
            <button className="px-5 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">
              {t('nav.signin')}
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-5 py-2 text-green-700 border border-green-600 rounded-lg hover:bg-green-100">
              {t('nav.signup')}
            </button>
          </Link>
        </div>
      </nav>

      <section className="flex flex-col-reverse items-center justify-between min-h-screen px-6 py-20 bg-green-100 md:flex-row">
        {/* Text Content */}
        <div className="w-full mt-10 ml-10 text-center md:w-1/2 md:mt-0 md:text-left">
          <h1 className="mb-6 text-4xl font-bold leading-snug text-green-800 md:text-5xl">
            {t('home.heroTitle')}
          </h1>
          <p className="max-w-xl mx-auto mb-6 text-lg text-gray-700 md:text-xl md:mx-0">
            {t('home.heroDescription')}
          </p>
          <button className="px-6 py-3 text-base text-white transition bg-green-600 rounded-lg shadow hover:bg-green-700 md:text-lg">
            {t('home.cta')}
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
        <h2 className="mb-8 text-4xl font-bold text-green-800">{t('features.title')}</h2>
        <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 transition border shadow-md rounded-2xl hover:scale-105 bg-green-50">
            <h3 className="mb-2 text-xl font-semibold">🌱 {t('features.uploadTitle')}</h3>
            <p>{t('features.uploadDesc')}</p>
          </div>
          <div className="p-6 transition border shadow-md rounded-2xl hover:scale-105 bg-green-50">
            <h3 className="mb-2 text-xl font-semibold">🛒 {t('features.orderTitle')}</h3>
            <p>{t('features.orderDesc')}</p>
          </div>
          <div className="p-6 transition border shadow-md rounded-2xl hover:scale-105 bg-green-50">
            <h3 className="mb-2 text-xl font-semibold">📦 {t('features.historyTitle')}</h3>
            <p>{t('features.historyDesc')}</p>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action + Contact */}
      <section className="flex flex-col items-center justify-center h-screen px-6 text-center bg-green-200">
        <h2 className="mb-6 text-4xl font-bold text-green-900">{t('cta.title')}</h2>
        <p className="max-w-xl mb-10 text-lg text-gray-800">
          {t('cta.description')}
        </p>

        <div className="mb-10 space-x-6">
          <a href="#contact" className="px-8 py-3 text-white bg-yellow-500 rounded-xl hover:bg-yellow-600">
            {t('cta.contact')}
          </a>
        </div>

        {/* Contact Info */}
        <div id="contact" className="flex flex-col items-center">
          <p className="mb-4 text-gray-700 text-md">📧 {t('cta.query')}</p>
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
