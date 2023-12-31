<script setup>
import { computed, onMounted, ref } from 'vue'
import { store } from '../store'
import { Task } from '../classes'

const props = defineProps({
  taskId: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['dismiss'])

const task = computed(() => {
  return store.tasks.find((i) => i.id === props.taskId)
})
const isNewTask = computed(() => {
  return props.taskId === undefined
})

const editTitle = ref('')
const editDesc = ref('')
const editLinks = ref([])

onMounted(() => {
  if (!isNewTask.value) {
    editTitle.value = task.value.title
    editDesc.value = task.value.description
    for (const link of task.value.links) {
      editLinks.value.push(link)
    }
  }
  editLinks.value.push('')
})

function save() {
  const target = isNewTask.value ? new Task() : task.value
  target.title = editTitle.value
  target.description = editDesc.value
  target.links = editLinks.value.filter((value) => {
    return value != ''
  })
  if (isNewTask.value) {
    store.tasks.push(target)
    if (store.settings.behavior.openAfterCreate) {
      store.spawnTaskWindow(target.id)
    }
  }
  emit('dismiss')
}

function adjustLinks(index) {
  if (editLinks.value[index] == '' && index < editLinks.value.length - 1) {
    editLinks.value.splice(index, 1)
  }
  if (index == editLinks.value.length - 1 && editLinks.value[index] != '') {
    editLinks.value.push('')
  }
}
</script>

<template>
  <div class="field-row-stacked">
    <label>Title</label>
    <input type="text" v-model="editTitle" />
  </div>
  <div class="field-row-stacked">
    <label>Description</label>
    <textarea rows="5" v-model="editDesc" />
  </div>
  <div class="field-row-stacked">
    <label>Links</label>
    <input type="text" v-for="(link, index) in editLinks" v-model="editLinks[index]" @input="adjustLinks(index)" />
  </div>
  <div>
    <p>
      <button @click="save" :disabled="editTitle.trim() == ''">Save</button> <button
        @click="$emit('dismiss')">Cancel</button>
    </p>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
