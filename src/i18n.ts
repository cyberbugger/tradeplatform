import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dropdown: {
        "select": "Select Product",
        "clear": "Clear"
      },
      marketPlatform: {
        "copyright": "\xa9 Copyright 2021",
        "loadingText": "Loading data ..."
      },
      priceview: {
        "bids": "Bids",
        "asks": "Asks",
        "matches": "Matches"
      },
      status: {
        "subscribed": "Product updates live!",
        "notsubscribed": "No product subscribed for updates!"
      },
      table: {
        "empty": {
          "title": "Subscribe to product updates",
          "subtitle": "Select a product from dropdown above to see updates"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;