<script setup>
    import { computed, ref } from 'vue'
    import TaskGeneral from '../tabs/TaskGeneral.vue'
    import TaskTimeLog from '../tabs/TaskTimeLog.vue'
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
                content: TaskGeneral
            },
            {
                name: `Time Log (${task.value.hours} hrs)`,
                content: TaskTimeLog
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