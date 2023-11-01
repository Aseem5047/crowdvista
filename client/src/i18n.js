// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // Update loadPath to point to your local 'locales' folder
        backend: {
            loadPath: "/locales/{{lng}}.json", // Relative to the public folder
        },
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
