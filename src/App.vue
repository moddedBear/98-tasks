<script setup>
import { ref, onMounted } from 'vue';
import TheWindow from './components/TheWindow.vue'
import { store } from './store.js'
import { Task, Log } from './classes/task';

const windows = ref([])

onMounted(() => {
  store.spawnMainWindow()
  const task1 = new Task()
  task1.title = 'Task 1'
  task1.hours = 2
  task1.completed = true
  const task2 = new Task()
  task2.title = 'Task 2'
  task2.hours = 1
  const task3 = new Task()
  task3.title = 'Task 3'
  task3.hours = 3
  task3.logs.push(new Log())
  store.tasks.push(task1)
  store.tasks.push(task2)
  store.tasks.push(task3)
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
    <component :is="TheWindow" ref="windows" :title="window.title" :screen="window.screen" :screenProps="window.screenProps" :id="window.id" :width="window.width" :initial-x="window.initialX" :initial-y="window.initialY" @raise="raise"></component>
  </template>
</template>

<style>
  body {
    background-color: #008080;
  }

</style>