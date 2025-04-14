<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useCurrencyStore } from "@/store/currency";
import { NAV_ITEMS } from "@/constants/nav";
import { CURRENCY_OPTIONS } from "@/constants/currency";

const route = useRoute();
const currencyStore = useCurrencyStore();

import Dropdown from "@/components/Dropdown.vue";
import IconCurrency from "@/components/icons/IconCurrency.vue";

const onMainCurrencyChange = (value) => {
  currencyStore.setMainCurrency(value);

  localStorage.setItem("mainCurrency", value);
};
</script>

<template>
  <header class="header">
    <div class="header__left">
      <RouterLink class="logo-wrapper" to="/">
        <IconCurrency />
      </RouterLink>

      <ul class="nav-list">
        <li v-for="item of NAV_ITEMS" :key="item.path" class="nav-list__item">
          <RouterLink
            exactActiveClass="nav-list__item-link--active"
            class="nav-list__item-link"
            :to="item.path"
          >
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <div>
      <Dropdown
        v-show="route.name !== 'home'"
        label="Основная валюта"
        width="120"
        :options="CURRENCY_OPTIONS"
        :value="currencyStore.mainCurrency"
        @change="onMainCurrencyChange"
      />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background-color: var(--vt-c-indigo);
  padding: 12px 24px;
  border-radius: 6px;
  box-shadow: 0px 5px 17px -6px rgba(23, 150, 247, 0.3);

  @media (max-width: 640px) {
    border-radius: 0;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 24px;
  }
}

.logo-wrapper {
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    display: none;
  }
}

.nav-list {
  display: flex;
  gap: 12px;

  &__item-link {
    color: #fff;
    padding: 8px;
    border-radius: 4px;

    &:not(.nav-list__item-link--active):hover {
      outline: 1px solid #ffffff27;
    }

    &--active {
      outline: 1px solid #ffffff6b;
    }
  }
}
</style>