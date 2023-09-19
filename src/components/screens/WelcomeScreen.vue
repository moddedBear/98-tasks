<script setup>
    import { onMounted, reactive, ref, computed } from 'vue'
    import TaskRow from '../TaskRow.vue';
    import { store } from '../../store'
    import { timeDateString } from '../../util'

    const completedTasks = computed(() => {
        return store.tasks.filter((task) => {
            return task.completed
        })
    })
    const activeTasks = computed(() => {
        return store.tasks.filter((task) => {
            return task.logs.some((log) => {
                return log.end === undefined
            })
        })
    })

    const now = ref('')

    function updateNow() {
        const n = new Date()
        now.value = timeDateString(n)
    }

    function confirmClearCompleted() {
        const title = 'Clear all completed tasks?'
        const text = `Are you sure you want to clear all ${completedTasks.value.length} completed tasks?`
        store.spawnYesNoDialogWindow(title, text, clearCompleted)
    }

    function clearCompleted() {
        store.tasks = store.tasks.filter((task) => {
            return !task.completed
        })
    }

    onMounted(() => {
        updateNow()
        setInterval(updateNow, 1000)
    })
</script>

<template>
    <p><button @click="store.spawnNewTaskWindow">New task</button> <button @click="confirmClearCompleted" :disabled="completedTasks.length == 0">Clear completed</button></p>

    <div class="sunken-panel" style="height: 150px">
        <table class="interactive">
            <thead>
                <tr>
                    <th>Status</th>
                    <th style="width: 100%">Title</th>
                    <th>Hours</th>
                    <th>Todo</th>
                    <th>Blockers</th>
                </tr>
            </thead>
            <tbody>
                <TaskRow v-for="task in store.tasks" :key="task.id" :task="task"></TaskRow>
            </tbody>
        </table>
    </div>

    <div class="status-bar">
        <p class="status-bar-field">{{ completedTasks.length }}/{{ store.tasks.length }} completed</p>
        <p class="status-bar-field">{{ activeTasks.length }}/{{ store.tasks.length }} active</p>
        <p class="status-bar-field">{{ now }}</p>
    </div>
</template>