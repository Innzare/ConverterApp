import { defineStore } from 'pinia';
import { CURRENCY, AVAILABLE_CURRENCIES } from '@/constants/currency';

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    currencies: null,
    mainCurrency: localStorage.getItem('mainCurrency') || CURRENCY.RUB
  }),

  getters: {
    formattedCurrencies: (state) => {
      const result = {};

      if (state.currencies) {
        const currenciesArray = Object.entries(state.currencies);
  
        const availableCurrencies = currenciesArray.filter(([currencyRateSides, value]) => {
          const [primaryCurrency, secondaryCurrency] = currencyRateSides.split("-");
  
          return (
            AVAILABLE_CURRENCIES.includes(secondaryCurrency) &&
            AVAILABLE_CURRENCIES.includes(primaryCurrency)
          );
        });
  
        availableCurrencies.forEach(([currencyRateSides, value]) => {
          const [primaryCurrency, secondaryCurrency] = currencyRateSides.split("-");
  
          result[primaryCurrency] = {
            ...result[primaryCurrency],
            [secondaryCurrency]: Number(value).toFixed(2)
          }
        });
      }

      return result
    },
  },

  actions: {
    setMainCurrency(currency) {
      this.mainCurrency = currency;
    },
    setCurrencies(currencies) {
      this.currencies = currencies;
    },
  },
})