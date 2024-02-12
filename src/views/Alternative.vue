<script setup lang="ts">
import { ref } from 'vue'
import UserCard from '@components/UserCard.vue'

const imageOption = ref('')
const labelOption = ref('')
const captionOption = ref('')
const applyDefaultPicture = () => imageOption.value = "https://images.prismic.io/profilephotos/15306430-5a6d-4436-80eb-dcf42533233d_wellington-new-zealand-profile-photos-portrait-photographer-models-headshots-dashing.jpg?ixlib=vue-2.9.0&auto=format%2C%20compress"
</script>

<template>
  <section class="section">
    <h2 class="title-h1">Define your model</h2>

    <div class="forms-container">
      <form class="config-form-options">
        <div class="form-row">
          <div class="label-container">
            <label for="image">Image :</label>
            <button class="button --link" type="button" @click.prevent="applyDefaultPicture">Apply default</button>
          </div>
          <input id="image" type="text" placeholder="https://my-picture.com/image.jpg" v-model="imageOption" />
        </div>

        <div class="form-row">
          <label for="label">Label :</label>
          <input id="label" type="text" placeholder="Samuel is" v-model="labelOption" />
        </div>

        <div class="form-row">
          <label for="caption">Caption :</label>
          <input id="caption" type="text" placeholder="Years old" v-model="captionOption" />
        </div>
      </form>

      <div class="usercard-container">
        <p>This card can be imported anywhere</p>
        <UserCard
          :image="imageOption"
          :label="labelOption"
          :caption="captionOption"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.forms-container {
  @apply flex justify-center items-center flex-wrap gap-5 w-full mx-auto md:justify-between;
}
.form-row {
  @apply flex flex-col mb-3;
}
input {
  @apply p-2 border-gray-200 border-[1px] rounded-md;
}
</style>
