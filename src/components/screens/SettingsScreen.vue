<script setup>
import { shallowRef } from 'vue'
import SettingsBehaviorTab from '../tabs/SettingsBehaviorTab.vue'
import SettingsBackgroundTab from '../tabs/SettingsBackgroundTab.vue'
import SettingsTitleBarTab from '../tabs/SettingsTitleBarTab.vue'
import SettingsWindowTab from '../tabs/SettingsWindowTab.vue'

const screens = [
  {
    name: 'Behavior',
    content: SettingsBehaviorTab
  },
  {
    name: 'Customization',
    screens: [
      {
        name: 'Background',
        content: SettingsBackgroundTab
      },
      {
        name: 'Title Bar',
        content: SettingsTitleBarTab
      },
      {
        name: 'Window',
        content: SettingsWindowTab
      }
    ]
  }
]
const activeScreen = shallowRef(screens[0].content)

function clickTreeItem(screen, index) {
  if (screen.content) {
    activeScreen.value = index
  }
}
</script>

<template>
  <div class="settings-container">
    <aside>
      <ul class="tree-view">
        <li
          v-for="(screen, index) in screens"
          :key="index"
          :class="[{ active: activeScreen == screen.content }]"
        >
          <a v-if="screen.content" @click="activeScreen = screen.content">{{ screen.name }}</a>
          <span v-else>{{ screen.name }}</span>
          <ul v-if="screen.screens">
            <li
              v-for="(childScreen, childIndex) in screen.screens"
              :key="childIndex"
              :class="[{ active: activeScreen == childScreen.content }]"
            >
              <a
                v-if="childScreen.content"
                @click="activeScreen = childScreen.content"
                :focus="activeScreen == childScreen.content"
                >{{ childScreen.name }}</a
              >
              <span v-else>{{ childScreen.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
    <main>
      <component :is="activeScreen"></component>
    </main>
  </div>
</template>

<style>
.settings-container {
  display: flex;
  height: 300px;
  overflow: scroll;
}
.settings-container aside {
  display: flex;
  align-self: stretch;
  flex: 1;
}
.settings-container main {
  flex: 2;
  margin-left: 8px;
}
.mt-0 {
  margin-top: 0;
}
.tree-view {
  width: 100%;
}
.tree-view li.active a {
  font-weight: bold;
}
</style>
