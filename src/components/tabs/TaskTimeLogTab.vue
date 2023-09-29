<script setup>
import { computed } from 'vue'
import { store } from '../../store'
import { Log } from '../../classes'
import { dateTimeString } from '../../util'

const props = defineProps({
  taskId: {
    type: String,
    required: true
  }
})

const task = computed(() => {
  return store.tasks.find((i) => i.id === props.taskId)
})

function timeIn() {
  const log = new Log()
  task.value.logs.unshift(log)
  task.value.hoursUpdateTime = new Date()
}
function timeOut() {
  const log = task.value.logs.find((log) => {
    return log.end === undefined
  })
  log.end = new Date()
}
</script>

<template>
  <p v-if="task.completed">This task is already completed!</p>
  <p>
    <button :disabled="task.isWorking || task.completed" @click="timeIn">Time In</button>
    <button :disabled="!task.isWorking" @click="timeOut">Time Out</button>
  </p>
  <div v-if="task.logs.length == 0">
    <hr />
    <p style="text-align: center">You haven't logged any work yet.</p>
  </div>
  <div class="log-container" v-else v-for="log in task.logs" :key="log.id">
    <hr />
    <div class="time-container">
      <div>
        <p>
          In <span class="sunken-panel">{{ dateTimeString(log.start) }}</span>
        </p>
      </div>
      <div>
        <p>
          Out <span class="sunken-panel">{{ log.end ? dateTimeString(log.end) : '—' }}</span>
        </p>
      </div>
    </div>
    <div class="field-row">
      <label :for="`log-note-${log.id}`">Note</label>
      <input type="text" v-model="log.text" :id="`log-note-${log.id}`" style="width: 100%" />
    </div>
  </div>
</template>

<style scoped>
.time-container {
  display: flex;
  flex-direction: row;
}

.time-container div {
  display: flex;
  flex: 1 0 0;
}

.time-container span.sunken-panel {
  padding: 2px;
}
</style>
