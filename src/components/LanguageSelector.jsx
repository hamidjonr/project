import "./Language.css"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', lang: 'English' },
    { code: 'uz', lang: 'Uzbek' }
  ];

  return (
    <div className="btn-container flex gap-[20px]">
      {languages.map((lng) => (
        <button
          key={lng.code}
          className={`hover:underline text-black cursor-pointer  ${lng.code === i18n.language ? 'font-bold' : ''}`}
          onClick={() => changeLanguage(lng.code)}
        >
          {lng.lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
