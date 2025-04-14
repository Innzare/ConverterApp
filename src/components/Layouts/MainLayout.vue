<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { useCurrencyStore } from "@/store/currency";
import { getCurrencies } from "@/services/api";

import Header from "@/components/Layouts/Header.vue";
import Footer from "@/components/Layouts/Footer.vue";
import Loader from "@/components/Loader.vue";

const currencyStore = useCurrencyStore();

const isLoading = ref(false);
const isError = ref(false);

onMounted(() => {
  updateCurrenciesRate();
});

const updateCurrenciesRate = async () => {
  isLoading.value = true;

  try {
    const data = await getCurrencies();

    currencyStore.setCurrencies(data);
  } catch (error) {
    isError.value = true;
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="layout">
    <Header />

    <main class="main-content">
      <div v-if="isLoading" class="loader-wrapper">
        <Loader />
      </div>

      <div v-else-if="isError" class="error-wrapper">Some error :(</div>

      <RouterView v-else v-slot="{ Component }">
        <Transition name="fade">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <Footer @updateCurrenciesRate="updateCurrenciesRate" />
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 640px;
  margin: 0 auto;
  gap: 16px;
  padding: 40px;

  @media (max-width: 640px) {
    padding: 0;
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  border-radius: 6px;
  background-color: #1e364257;

  @media (max-width: 640px) {
    border-radius: 0;
  }
}

.loader-wrapper,
.error-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>