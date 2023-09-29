<script setup>
  import { ref } from 'vue'
  import { store } from '../../store'

  const settings = ref(store.settings.customization.titleBar)
</script>

<template>
  <p>
    <input type="checkbox" id="useCheckbox" v-model="settings.use"/>
    <label for="useCheckbox">Use custom title bars</label>
  </p>
  <fieldset>
    <legend>Colors</legend>
    <div class="field-row">
      <label for="color1Text">Color 1</label>
      <input type="text" id="color1Text" v-model="settings.color1"/>
    </div>
    <div class="field-row">
      <label for="color2Text">Color 2</label>
      <input type="text" id="color2Text" v-model="settings.color2"/>
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
