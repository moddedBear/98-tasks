<script setup>
  import { ref, onMounted, watchEffect } from 'vue';
  import TheWindow from './components/TheWindow.vue'
  import { store } from './store.js'
  import { Task, Log } from './classes';

  const windows = ref([])

  onMounted(() => {
    // const task1 = new Task()
    // task1.title = 'Task 1'
    // task1.completed = true
    // const task2 = new Task()
    // task2.title = 'Task 2'
    // const task3 = new Task()
    // task3.title = 'Task 3'
    // task3.logs.value.push(new Log())
    // store.tasks.push(task1)
    // store.tasks.push(task2)
    // store.tasks.push(task3)
    store.tasks = JSON.parse(window.localStorage.getItem("tasks"), (key, value) => {
      if (key === 'start' || key === 'end') {
        return new Date(value)
      }
      return value
    })
    if (!store.tasks) {
      store.tasks = []
    }
    watchEffect(() => {
      window.localStorage.setItem("tasks", JSON.stringify(store.tasks))
    })
    store.spawnMainWindow()
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
  <div id="desktop">
    <template v-for="window in store.windows" :key="window.id">
      <component :is="TheWindow" ref="windows" :title="window.title" :screen="window.screen" :screenProps="window.screenProps" :id="window.id" :width="window.width" :initial-x="window.initialX" :initial-y="window.initialY" @raise="raise"></component>
    </template>
  </div>
</template>

<style>
  body {
    background-color: #008080;
  }
  #desktop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    overflow: hidden;
  }
  a {
    cursor: pointer;
  }
  p {
    white-space: pre-wrap;
  }
</style>