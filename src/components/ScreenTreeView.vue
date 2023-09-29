<script setup>
const props = defineProps({
  isRoot: {
    type: Boolean,
    default: false
  },
  screens: {
    required: true
  }
})

const emit = defineEmits(['activate'])
</script>

<template>
  <ul :class="[{ 'tree-view': isRoot }]">
    <li v-for="(screen, index) in screens" :key="index">
      <a
        v-if="screen.content"
        @click="$emit('activate', screen.content)"
        :focus="activeScreen == screen.content"
        >{{ screen.name }}</a
      >
      <span v-else>{{ screen.name }}</span>
      <ul v-if="screen.screens"></ul>
    </li>
  </ul>
</template>
