<script setup>
import { Settings } from '../../classes'
import { store } from '../../store'

function confirmReset() {
  const title = 'Reset settings?'
  const text = 'Are you sure you want to reset your settings to the defaults?'
  store.spawnYesNoDialogWindow(title, text, reset)
}

function reset() {
  store.settings = new Settings()
}
</script>

<template>
  <p>
    Something not behaving as it should? You can try resetting your settings to the defaults. Your
    tasks will be unaffected.
  </p>
  <p>
    <button @click="confirmReset">Reset settings</button>
  </p>
</template>
