<script setup>
  import { ref } from 'vue'
  import { store } from '../../store'

  const settings = ref(store.settings.customization.window)
</script>

<template>
  <p>
    <input type="checkbox" id="useCheckbox" v-model="settings.use"/>
    <label for="useCheckbox">Use custom windows</label>
  </p>
  <fieldset>
    <legend>Colors</legend>
    <div class="field-row">
      <label for="backgroundText">Background color</label>
      <input type="text" id="backgroundText" v-model="settings.background"/>
    </div>
    <div class="field-row">
      <label for="textColorText">Text color</label>
      <input type="text" id="textColorText" v-model="settings.textColor"/>
    </div>
  </fieldset>
  <p>
    Colors can be any valid CSS color value.
  </p>
</template>
