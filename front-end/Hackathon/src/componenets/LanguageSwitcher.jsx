import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => changeLanguage('en')} 
        className="px-4 py-2 text-sm font-medium text-green-700 transition border border-green-600 rounded-lg hover:bg-green-100 hover:scale-105"
      >
        English
      </button>
      <button 
        onClick={() => changeLanguage('ta')} 
        className="px-4 py-2 text-sm font-medium text-green-700 transition border border-green-600 rounded-lg hover:bg-green-100 hover:scale-105"
      >
        தமிழ்
      </button>
    </div>
  );
};

export default LanguageSwitcher;
