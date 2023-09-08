<script setup>
    import { ref } from 'vue';
    import TaskGeneral from '../tabs/TaskGeneral.vue'

    const props = defineProps({
        taskId: {
            type: String,
            required: true,
        }
    })

    const activeTab = ref(0)
    const tabs = [
        {
            name: "General",
            content: TaskGeneral
        },
    ]
</script>

<template>
    <menu role="tablist">
        <li v-for="(tab, index) in tabs" :key="tab.name" @click="activeTab = index" role="tab" :aria-selected="index == activeTab"><a>{{ tab.name }}</a></li>
    </menu>
    <div class="window" role="tabpanel">
        <div class="window-body">
            <component :is="tabs[activeTab].content" :task-id="taskId"></component>
        </div>
    </div>
</template>