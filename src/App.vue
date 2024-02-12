<script setup lang="ts">
</script>

<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>

<style>
  #app {
    @apply w-full min-h-[100vh] max-h-[100vh] flex justify-center items-center p-4;
  }
</style>
