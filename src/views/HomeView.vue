<template>
  <div class="home-page">
    <h2>Тестовое задание на позицию Frontend-разработчика</h2>

    <p>Чтобы перейти в Конвертер воспользуйтесь навигацией в хедере 👆</p>

    <div>
      Ссылки:
      <a
        class="home-page__link"
        href="https://github.com/Innzare/ConverterApp"
        target="_blank"
      >
        Исходный код </a
      >,
      <a
        class="home-page__link"
        href="https://hh.ru/resume/63f494faff051df1290039ed1f756c33416479"
        target="_blank"
      >
        Резюме
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.home-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  text-align: center;
  color: #fff;

  h2 {
    line-height: 24px;
  }

  &__link {
    text-decoration: none;
    color: #1965c5;
  }
}
</style>