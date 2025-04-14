<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
.loader {
  border-width: 3px;
  border-style: solid;
  border-color: #aaaaaa #aaaaaa #aaaaaa transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>