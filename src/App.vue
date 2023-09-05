<script setup>
import { ref, onMounted } from 'vue';
import TheWindow from './components/TheWindow.vue'
import { store } from './store.js'

const windows = ref([])

onMounted(() => {
  store.spawnWindow()
})

function raise(id) {
  let maxHeight = 0
  let index = -1
  for (const [i, window] of windows.value.entries()) {
    maxHeight = Math.max(maxHeight, window.height)
    if (window.props.id === id) {
      index = i
    }
  }
  if (index == -1) {
    console.error("AGIUIHOIUDSH THE ID WASN'T FOUND")
    return
  }
  const window = windows.value[index]
  if (window.height <= maxHeight) {
    window.height = maxHeight + 1
  }
}
</script>

<template>
  <template v-for="window in store.windows" :key="window.id">
    <component :is="TheWindow" ref="windows" :title="window.title" :id="window.id" :width="window.width" :initial-x="window.initialX" :initial-y="window.initialY" @raise="raise"></component>
  </template>
  <!-- <TheWindow title="98 Tasks" width="500px" :initial-x="50" :initial-y="50" />  */}}
  {{/*  <TheWindow title="98 Tasks 2" width="500px" :initial-x="100" :initial-y="100" />  */}} -->
</template>

<style>
  body {
    background-color: #008080;
  }

</style>