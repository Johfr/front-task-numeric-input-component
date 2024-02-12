<script setup lang="ts">
import { computed } from 'vue'
import { User } from '@types/User.ts'
import { useUser } from "@composables/useUserAuth.js"

const userData:User = useUser().userData
const userPhoto = computed(():string => `url(${userData.value.photo})`)
const userFirstName = computed(() => userData.value.name.split(' ')[0])
</script>

<template>
  <section class="container">
    <h1 class="title-h1">Welcome {{ userFirstName }}</h1>
    
    <div class="card">
      <!-- user picture -->
      <div class="user-picture" />
      
      <!-- user infos -->
      <div class="user-infos">
        <p class="user-name">
          {{ userData.name }}
        </p>
        <p>
          {{ userData.age }} years old
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title-h1 {
  @apply text-center;
}
.user-name {
  @apply text-2xl font-bold;
}
.user-picture {
  @apply min-w-14 min-h-14 rounded-full bg-gray-300;
  background-size: cover;
  background-position: center;
  background-image: v-bind(userPhoto);
}
</style>
