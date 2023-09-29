<script setup>
import { computed, ref, watchEffect } from 'vue'
import TaskGeneralTab from '../tabs/TaskGeneralTab.vue'
import TaskTimeLogTab from '../tabs/TaskTimeLogTab.vue'
import TaskNotesTab from '../tabs/TaskNotesTab.vue'
import TaskTodoTab from '../tabs/TaskTodoTab.vue'
import TaskBlockersTab from '../tabs/TaskBlockersTab.vue'
import { store } from '../../store'

const props = defineProps({
  taskId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const task = computed(() => {
  return store.tasks.find((i) => i.id === props.taskId)
})

const status = computed(() => {
  if (task.value.completed) return '✔️'
  if (task.value.isWorking) return '🟢'
  return '🔴'
})

const activeTab = ref(0)
const tabs = computed(() => {
  return [
    {
      name: 'General',
      content: TaskGeneralTab
    },
    {
      name: `${status.value} Time Log (${task.value.hours} hrs)`,
      content: TaskTimeLogTab
    },
    {
      name: `Notes (${task.value.notes.length})`,
      content: TaskNotesTab
    },
    {
      name: `Todo (${task.value.uncompletedTodos.length})`,
      content: TaskTodoTab
    },
    {
      name: `Blockers (${task.value.uncompletedBlockers.length})`,
      content: TaskBlockersTab
    }
  ]
})

watchEffect(() => {
  if (task.value === undefined) {
    emit('close')
  }
})
</script>

<template>
  <menu role="tablist">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      @click="activeTab = index"
      role="tab"
      :aria-selected="index == activeTab"
    >
      <a>{{ tab.name }}</a>
    </li>
  </menu>
  <div class="window" role="tabpanel">
    <div class="window-body">
      <component :is="tabs[activeTab].content" :task-id="taskId"></component>
    </div>
  </div>
</template>

<style scoped>
li {
  cursor: pointer;
}
.window-body {
  height: 300px;
  overflow: scroll;
}
</style>
