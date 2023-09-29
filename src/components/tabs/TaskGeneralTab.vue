<script setup>
import { computed, ref } from 'vue'
import { store } from '../../store'
import TaskGeneralEdit from '../TaskGeneralEdit.vue'

const props = defineProps({
  taskId: {
    type: String,
    required: true
  }
})

const task = computed(() => {
  return store.tasks.find((i) => i.id === props.taskId)
})

const isEditing = ref(false)

function removeTask() {
  store.tasks = store.tasks.filter((task) => {
    return task.id != props.taskId
  })
}

function remove() {
  if (!store.settings.behavior.confirmTaskDeletion) {
    removeTask()
    return
  }
  const title = 'Remove task?'
  const text = `Are you sure you want to remove the task "${task.value.title}"?`
  store.spawnYesNoDialogWindow(title, text, removeTask)
}

function toggleCompleted() {
  console.log(task.value.title)
  if (task.value.completed && task.value.isWorking) {
    task.value.completed = false
    const title = 'Stop working?'
    const text = `You are still working on "${task.value.title}" according to your time log. Would you like to stop working and mark this task as completed?`
    store.spawnYesNoDialogWindow(title, text, stopWorking)
  }
}

function stopWorking() {
  const log = task.value.logs.find((log) => {
    return log.end === undefined
  })
  log.end = new Date()
  task.value.completed = true
}
</script>

<template>
  <div v-if="!isEditing">
    <fieldset>
      <legend>Title</legend>
      <p>{{ task.title }}</p>
    </fieldset>
    <div v-if="task.description">
      <fieldset>
        <legend>Description</legend>
        <p>{{ task.description }}</p>
      </fieldset>
    </div>
    <div v-if="task.links.length">
      <fieldset>
        <legend>Links</legend>
        <ul>
          <li v-for="link in task.links" style="word-break: break-all">
            <a :href="link" target="_blank">{{ link }}</a>
          </li>
        </ul>
      </fieldset>
    </div>
    <p>
      <input
        type="checkbox"
        :id="`completed-${task.id}`"
        v-model="task.completed"
        @change="toggleCompleted"
      />
      <label :for="`completed-${task.id}`">Completed?</label>
    </p>
  </div>
  <TaskGeneralEdit v-else :task-id="taskId" @dismiss="isEditing = false" />
  <div v-if="!isEditing">
    <p><button @click="isEditing = true">Edit</button> <button @click="remove">Remove</button></p>
  </div>
</template>

<style scoped>
fieldset p,
ul {
  margin: 0;
}
</style>
