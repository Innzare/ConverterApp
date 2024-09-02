<script setup>
import { CURRENCY_OPTIONS } from "@/constants/currency";
import Dropdown from "@/components/Dropdown.vue";

const props = defineProps(["value"]);
const emit = defineEmits(["change"]);

const updateRatio = (event) => {
  emit("change", {
    currency: props.value.currency,
    rate: event.target.value,
  });
};

const updateCurrency = (newValue) => {
  emit("change", {
    currency: newValue,
    rate: props.value.rate,
  });
};
</script>

<template>
  <div class="convert-input-wrapper">
    <div class="convert-input">
      <input :value="value.rate" @input="updateRatio" type="number" />

      <Dropdown
        :value="value.currency"
        @change="updateCurrency"
        :options="CURRENCY_OPTIONS"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.convert-input-wrapper {
  border: 1px solid #cccccc85;
  border-radius: 4px;
  transition: border-color 0.25s;

  &:hover {
    border: 1px solid #cccccc;
  }

  &:focus-within {
    border: 1px solid #cccccc;
  }
}
.convert-input {
  display: flex;
  align-items: stretch;
  gap: 4px;
  margin: 4px;

  input {
    padding: 4px;
    color: #fff;
    font-size: 21px;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
</style>