<script setup>
import { computed } from "vue";
import { getCurrencies } from "@/services/api";
import { useCurrencyStore } from "@/store/currency";
import { AVAILABLE_CURRENCIES } from "@/constants/currency";

const currencyStore = useCurrencyStore();

const currenciesFormatted = computed(() => {
  if (currencyStore.currencies) {
    const currenciesRate =
      currencyStore.formattedCurrencies[currencyStore.mainCurrency];

    return Object.entries(currenciesRate).map(([currency, value]) => {
      return `1 ${currency.toUpperCase()} = ${value} ${currencyStore.mainCurrency.toUpperCase()}`;
    });
  }

  return [];
});
</script>

<template>
  <div class="home-page">
    <h2 class="home-page__title">Курсы валют</h2>

    <div class="home-page__currencies">
      <div v-for="item of currenciesFormatted" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  flex: 1;

  &__title {
    text-align: center;
  }

  &__currencies {
    font-size: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
}
</style>