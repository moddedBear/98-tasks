<script setup>
import { ref } from 'vue'
import { store } from '../../store'

const settings = ref(store.settings.customization.background)
</script>

<template>
  <p>
    <input type="checkbox" id="useCheckbox" v-model="settings.use" />
    <label for="useCheckbox">Use custom background</label>
  </p>
  <p></p>
  <fieldset>
    <legend>Type</legend>
    <div class="field-row">
      <input type="radio" id="colorTypeRadio" v-model="settings.type" value="color" />
      <label for="colorTypeRadio">Color</label>
    </div>
    <div class="field-row">
      <input type="radio" id="gradientTypeRadio" v-model="settings.type" value="gradient" />
      <label for="gradientTypeRadio">Gradient</label>
    </div>
    <div class="field-row">
      <input type="radio" id="imageTypeRadio" v-model="settings.type" value="image" />
      <label for="imageTypeRadio">Image</label>
    </div>
  </fieldset>
  <p></p>
  <fieldset>
    <legend>Background</legend>
    <div v-if="settings.type == 'color'">
      <div class="field-row">
        <label for="colorText">Color</label>
        <input type="text" id="colorText" v-model="settings.color" />
      </div>
    </div>
    <div v-else-if="settings.type == 'gradient'">
      <div class="field-row">
        <label for="angleRange">Angle</label>
        <input type="range" id="angleRange" min="0" max="360" v-model="settings.gradient.angle" />
      </div>
      <div class="field-row">
        <label for="color1Text">Color 1</label>
        <input type="text" id="color1Text" v-model="settings.gradient.color1" />
      </div>
      <div class="field-row">
        <label for="color2Text">Color 2</label>
        <input type="text" id="color2Text" v-model="settings.gradient.color2" />
      </div>
    </div>
    <div v-else-if="settings.type == 'image'">
      <div class="field-row-stacked">
        <label for="imageText">Image URL</label>
        <input type="text" id="imageText" v-model="settings.image" />
      </div>
    </div>
  </fieldset>
  <p>Colors can be any valid CSS color value.</p>
</template>
