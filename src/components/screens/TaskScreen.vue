<script setup>
    import { computed, ref } from 'vue'
    import TaskGeneralTab from '../tabs/TaskGeneralTab.vue'
    import TaskTimeLogTab from '../tabs/TaskTimeLogTab.vue'
    import TaskNotesTab from '../tabs/TaskNotesTab.vue'
    import { store } from '../../store'

    const props = defineProps({
        taskId: {
            type: String,
            required: true,
        }
    })

    const task = computed(() => {
        return store.tasks.find((i) => i.id === props.taskId)
    })
    const activeTab = ref(0)
    const tabs = computed(() => {
        return [
            {
                name: 'General',
                content: TaskGeneralTab
            },
            {
                name: `Time Log (${task.value.hours} hrs)`,
                content: TaskTimeLogTab
            },
            {
                name: `Notes (${task.value.notes.length})`,
                content: TaskNotesTab
            },
        ]
    })
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

<style scoped>
    li {
        cursor: pointer;
    }
</style>