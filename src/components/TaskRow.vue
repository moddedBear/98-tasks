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
        <td style="text-align: center">{{ status }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.hours }}</td>
        <td>{{ task.uncompletedTodos.length }}</td>
        <td>{{ task.uncompletedBlockers.length }}</td>
    </tr>
</template>