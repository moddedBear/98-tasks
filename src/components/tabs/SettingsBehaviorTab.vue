<script setup>
import { ref } from 'vue'
import { store } from '../../store'

const settings = ref(store.settings.behavior)
</script>

<template>
  <p>
    <input type="checkbox" id="openAfterCreateCheckbox" v-model="settings.openAfterCreate" />
    <label for="openAfterCreateCheckbox">Open task window after a new task is created</label>
  </p>
  <p>
    <input
      type="checkbox"
      id="confirmTaskDeletionCheckbox"
      v-model="settings.confirmTaskDeletion"
    />
    <label for="confirmTaskDeletionCheckbox">Confirm task deletion</label>
  </p>
</template>
