<script setup>
import { computed } from 'vue';
import { Task } from '../classes/task'

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
</script>

<template>
    <tr>
        <td style="text-align: center">{{ status }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.hours }}</td>
        <td>{{ task.blockers.length }}</td>
    </tr>
</template>