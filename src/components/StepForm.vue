<script setup lang="ts">
import { ref } from 'vue'
import { UserFormEntries } from "@types/FormEntries"
import { useRouter } from 'vue-router'
import { useAuth } from "@store/useAuth"

const router = useRouter()
const userStore = useAuth()

const stepPosition = ref<number>(0)
const formattedValue = ref<string>('')
const userName = ref<string>('')
const userAge = ref<string>('')
const userPhoto = ref<string>('')

const steps:UserFormEntries[] = [
  {
    name: "name",
    label: "Your full name",
    placeholder: "Type Here",
    type: 'text',
    action: (value) => userName.value = value
  },
  {
    name: "age",
    label: "How old are you ?",
    placeholder: "your age",
    type: 'number',
    action: (value) => {
      userAge.value = value
    }
  },
  {
    name: "photo",
    label: "Share your best photo",
    placeholder: "http://mypicture.com",
    type: 'text',
    action: (value) => {
      userPhoto.value = value
      userStore.setUser({
        name: userName.value,
        age: parseInt(userAge.value.replace(/\s+/g, ''), 10),
        photo: userPhoto.value,
      });
      router.push({ name: 'home' })
    }
  }
]

// Add spaces between each 3 numbers
const formatNumber = (event: Event, step: UserFormEntries): void => {
  const target = event.target as HTMLInputElement
  if (step.type === "number") {
    // Delete all spaces and non numerical entry
    const cleanedInput = target.value.replace(/[^\d\s]/g, '')
    target.value = cleanedInput
    const pureNumber = cleanedInput.replace(/\s+/g, '')

    if (!isNaN(+pureNumber) && pureNumber) {
      // Format the number
      const formatter = new Intl.NumberFormat('fr-FR')
      formattedValue.value = formatter.format(+pureNumber)
    } else {
      formattedValue.value = ''
    }
  } else {
    formattedValue.value = target.value
  }
}

const applyDefaultPicture = () => formattedValue.value = userPhoto.value = "https://images.prismic.io/profilephotos/15306430-5a6d-4436-80eb-dcf42533233d_wellington-new-zealand-profile-photos-portrait-photographer-models-headshots-dashing.jpg?ixlib=vue-2.9.0&auto=format%2C%20compress"

const goNext = ():void => {
  const currentStep = steps[stepPosition.value]
  const nextStep = steps[stepPosition.value + 1]
  if (currentStep && formattedValue.value) {
    currentStep.action(formattedValue.value)
    formattedValue.value = '' // Réinitialiser la valeur formatée pour la prochaine saisie
    
    if (stepPosition.value + 1 < steps.length) {
      stepPosition.value += 1 // Passer à l'étape suivante seulement s'il y en a une

      if (nextStep.name === "name") {
        formattedValue.value = userName.value
      } else if (nextStep.name === "age") {
        formattedValue.value = userAge.value
      } else if (nextStep.name === "photo") {
        formattedValue.value = userPhoto.value
      } else {
        formattedValue.value = ''
      }
    }
  }
}
const goBack = ():void => {
  stepPosition.value -= 1
  const currentStep = steps[stepPosition.value]

  if (currentStep.name === "name") {
    formattedValue.value = userName.value
  } else if (currentStep.name === "age") {
    formattedValue.value = userAge.value
  } else {
    formattedValue.value = userPhoto.value
  }
}
</script>

<template>
  <div class="container">
    <button v-show="stepPosition > 0" class="button --outline" @click.prevent="goBack">&lt; Back</button>
    <form class="step-form">
      <div class="step" v-for="(step, stepIndex) in steps" :key="stepIndex">
        <Transition name="slide-up">
          <div v-show="stepPosition === stepIndex" class="input-container">
            <label for="nickName">
              {{ step.label }}
            </label>
            <input type="text" :placeholder="step.placeholder" id="nickName" v-model="formattedValue" @input="formatNumber($event, step)">
            <button class="button --link" type="button" v-show="step.name === 'photo'" @click.prevent="applyDefaultPicture">Apply default</button>
          </div>
        </Transition>
      </div>
    </form>
    <button class="button" @click.prevent="goNext">Next</button>
</div>
</template>

<style scoped>
.step-form {
  @apply min-h-32 max-h-32 mb-5 overflow-hidden;
}
.input-container {
  @apply flex flex-col mb-5;
  label {
    @apply mb-5 font-bold text-2xl;
  }
  input {
    @apply min-h-14 py-2 font-bold text-4xl;

    &:focus-visible {
      outline: none;
    }

    & + button {
      @apply text-left;
    }
  }
}

/* Transition style */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(70px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-70px);
}
</style>
