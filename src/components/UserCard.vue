<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  caption: string,
  label: string,
  image: string,
}>()

const userImage = computed(():string => `url(${props.image})`)
const inputValue = ref('')

const formatNumber = (event: Event): void => {
  // Extract and clean the content of the contenteditable div
  const target = event.target as HTMLElement
  let content = target.innerText.replace(/[^\d]/g, '')

  // Insert spaces every three digits without converting to a number
  let formattedContent = content.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  // Update the div content with the formatted content
  target.innerText = formattedContent

  // Restore the cursor to the end of the text
  const range = document.createRange()
  const sel = window.getSelection()
  range.selectNodeContents(target)
  range.collapse(false)
  if (sel) {
    sel.removeAllRanges()
    sel.addRange(range)
  }
}
</script>

<template>
  <div class="card">
    <!-- user picture -->
    <div class="user-picture" />

    <div>
      <label :for="label">
        {{ label || "label" }}
      </label>
      <div class="flex gap-2">
        <div class="editable-element" contenteditable="true" @input="formatNumber">
          {{ inputValue }}
        </div>
        <div class="text">
          {{ caption || "caption" }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-picture {
  @apply min-w-14 min-h-14 bg-gray-300 rounded-full w-14 h-14 bg-no-repeat bg-cover bg-center;
  background-image: v-bind('userImage');
}
.editable-element {
  @apply block min-w-[4.5rem] w-auto p-1 border-gray-200 border-[1px] rounded-md;
}
</style>
