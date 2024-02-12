<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from "@composables/useUserAuth.js"
const isAuth = useUser().isAuth

const router = useRouter()
const buttonText = ref<string>("")
const linkTo = ref<string>("")

watchEffect(() => {
  if (router.currentRoute.value.fullPath === "/alternative") {
    buttonText.value = "< Go back to original form"
    linkTo.value = "/"
  } else {
    buttonText.value = "Skip and go to alternative form >"
    linkTo.value = "/alternative"
  }
})
</script>

<template>
  <section>
    <h1 class="title-h1">
      <span v-if="!isAuth">
        Hi there, let's talk !
      </span>
      <span v-else>
        You're now connected !
      </span>
    </h1>
    <router-link :to="linkTo" class="button --underline">
      {{ buttonText }}
    </router-link>
    
    <div class="main">
      <router-view v-slot="{ Component }">
        <transition name="opacity">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </section>
</template>

<style scoped>
.main {
  @apply w-full mx-auto bg-white;
}
.title-h1 {
  @apply text-6xl font-normal;
}

/* Transition style */
.opacity-enter-active {
  transition: all 0.75s ease;
  opacity: 1;
}
.opacity-leave-active {
  opacity: 0;
}

.opacity-enter-from {
  opacity: 0;
  /* transform: translateY(70px); */
}

.opacity-leave-to {
  opacity: 0;
  /* transform: translateY(-70px); */
}
</style>
