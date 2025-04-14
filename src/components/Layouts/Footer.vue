<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const emit = defineEmits(["updateCurrenciesRate"]);
</script>

<template>
  <footer class="footer">
    <button
      v-show="route.name !== 'home'"
      class="update-currencies-rate-button"
      @click="emit('updateCurrenciesRate')"
    >
      Обновить курс
    </button>

    <span>Frontend development test task.</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  background-color: var(--vt-c-indigo);
  padding: 12px 24px;
  border-radius: 6px;
  box-shadow: 0px 5px 17px -6px rgba(23, 150, 247, 0.3);

  @media (max-width: 640px) {
    border-radius: 0;
  }
}

.update-currencies-rate-button {
  background-color: transparent;
  color: #fff;
  border: 1px solid rgba(30, 95, 174, 0.5);
  border-radius: 4px;
  padding: 6px 12px;
  transition: border-color 0.25s ease;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    border-color: rgba(30, 95, 174, 1);
  }
}
</style>