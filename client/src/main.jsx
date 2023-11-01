import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "./store/store";

import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import frTranslation from "./locales/fr.json";

import { I18nextProvider } from "react-i18next";

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		resources: {
			en: { translation: enTranslation },
			fr: { translation: frTranslation },
		},
		fallbackLng: "en",
		debug: true,
	});

const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Toaster
					toastOptions={{
						style: {
							padding: "16px",
							color: "black",
						},
						position: "bottom center", // Set the position to "bottom"
					}}
				/>
				<I18nextProvider i18n={i18n}>
					<App />
				</I18nextProvider>
			</PersistGate>
		</Provider>
	</BrowserRouter>
);
