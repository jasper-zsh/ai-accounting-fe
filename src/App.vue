<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="less">
#app {
  height: 100%;
  padding: 0;
  background-color: @doc-bg-color;
}
html {
  overflow: hidden;
}
body {
  overflow: hidden;
}
</style>
