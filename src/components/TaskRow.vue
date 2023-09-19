<script setup>
    import { computed } from 'vue';
    import { Task } from '../classes'
    import { store } from '../store'

    const props = defineProps({
        task: {
            type: Task,
            required: true,
        }
    })

    const status = computed(() => {
        if (props.task.completed) return '✔️'
        const logInProgress = props.task.logs.some((log) => {
            return log.end === undefined
        })
        if (logInProgress) return '🟢'
        return '🔴'
    })

    function openTask() {
        store.spawnTaskWindow(props.task.id)
    }
</script>

<template>
    <tr @click="openTask">
        <td class="center">{{ status }}</td>
        <td>{{ task.title }}</td>
        <td class="center">{{ task.hours }}</td>
        <td class="center">{{ task.uncompletedTodos.length }}</td>
        <td class="center">{{ task.uncompletedBlockers.length }}</td>
    </tr>
</template>

<style scoped>
    .center {
        text-align: center;
    }
</style>