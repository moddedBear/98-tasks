<script setup>
    import { onMounted, reactive, ref } from 'vue'
    import TaskRow from '../TaskRow.vue';
    import { store } from '../../store.js'

    const now = reactive({
        time: '',
        date: '',
    })

    const highlightedTask = ref(undefined)

    function updateNow() {
        let n = new Date()
        now.time = `${n.getHours()}:${n.getMinutes()}`
        now.date = `${n.toDateString()}`
    }

    onMounted(() => {
        updateNow()
        setInterval(updateNow, 1000)
    })
</script>

<template>
    <div @click.self="highlightedTask = undefined">
        <p><button @click="store.spawnNewTaskWindow">New task</button></p>
    
        <div class="sunken-panel" style="height: 150px">
            <table class="interactive">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th style="width: 100%">Title</th>
                        <th>Hours</th>
                        <th>Blockers</th>
                    </tr>
                </thead>
                <tbody>
                    <TaskRow v-for="task in store.tasks" :key="task.id" :task="task"></TaskRow>
                </tbody>
            </table>
        </div>
    
        <div class="status-bar">
            <p class="status-bar-field">{{ now.time }}</p>
            <p class="status-bar-field">{{ store.tasks.length }} tasks</p>
            <p class="status-bar-field">{{ now.date }}</p>
        </div>
    </div>
</template>