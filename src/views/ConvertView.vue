<script setup>
import { onMounted, reactive, computed, watch } from "vue";
import { useCurrencyStore } from "@/store/currency";
import { CURRENCY } from "@/constants/currency";
import ConvertInput from "@/components/ConvertInput.vue";
import IconSwitch from "@/components/icons/IconSwitch.vue";

const currencyStore = useCurrencyStore();

const form = reactive({
  primaryRate: {
    currency: CURRENCY.RUB,
    rate: 1,
  },
  secondaryRate: {
    currency: CURRENCY.USD,
    rate: null,
  },
});

onMounted(() => {
  setSecondaryCurrencyRate(form.primaryRate.rate);
});

const setPrimaryCurrencyRate = (rate) => {
  const secondaryCurrencyRatio =
    currencyStore.formattedCurrencies[form.secondaryRate.currency];

  const primaryCurrencyRateToPrimary =
    secondaryCurrencyRatio && secondaryCurrencyRatio[form.primaryRate.currency];

  const result = rate * primaryCurrencyRateToPrimary;

  form.primaryRate.rate = result ? result.toFixed(2) : null;
};

const setSecondaryCurrencyRate = (rate) => {
  const primaryCurrencyRatio =
    currencyStore.formattedCurrencies[form.primaryRate.currency];

  const secondaryCurrencyRateToPrimary =
    primaryCurrencyRatio && primaryCurrencyRatio[form.secondaryRate.currency];

  const result = rate * secondaryCurrencyRateToPrimary;

  form.secondaryRate.rate = result ? result.toFixed(2) : null;
};

const onCurrencyChange = (data, type) => {
  if (type === "primaryRate") {
    if (data.currency === form.secondaryRate.currency) {
      form.secondaryRate.currency = form.primaryRate.currency;
    }

    form.primaryRate = data;

    setSecondaryCurrencyRate(data.rate);
  }

  if (type === "secondaryRate") {
    if (data.currency === form.primaryRate.currency) {
      form.primaryRate.currency = form.secondaryRate.currency;
    }

    form.secondaryRate = data;

    setSecondaryCurrencyRate(form.primaryRate.rate);
  }
};

const onSwitchCurrenciesClick = () => {
  const primaryRateCurrency = form.primaryRate.currency;
  form.primaryRate.currency = form.secondaryRate.currency;
  form.secondaryRate.currency = primaryRateCurrency;

  setSecondaryCurrencyRate(form.primaryRate.rate);
};
</script>

<template>
  <div class="convert-page">
    <h2 class="convert-page__title">Конвертер</h2>

    <div class="convert-page__converter">
      <ConvertInput
        label="Валюта"
        :value="form.primaryRate"
        @change="(data) => onCurrencyChange(data, 'primaryRate')"
      />
      <button class="switch-button" @click="onSwitchCurrenciesClick">
        <IconSwitch />
      </button>
      <ConvertInput
        label="Валюта"
        :value="form.secondaryRate"
        @change="(data) => onCurrencyChange(data, 'secondaryRate')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.convert-page {
  display: flex;
  flex-direction: column;
  flex: 1;

  &__title {
    text-align: center;
  }

  &__converter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    gap: 24px;
  }
}

.switch-button {
  border: 0;
  width: 40px;
  height: 40px;
  background: rgba(0, 145, 255, 1);
  color: #fff;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;

  svg {
    width: 100%;
  }
}
</style>
