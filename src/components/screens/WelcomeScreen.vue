<script setup>
    import { onMounted, reactive } from 'vue'
    import { store } from '../../store.js'

    const now = reactive({
        time: '',
        date: '',
    })

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
    <p>Current tasks will go here!</p>
    <button>New task</button> <button @click="store.spawnWindow">New window</button>

    <div class="status-bar">
        <p class="status-bar-field">{{ now.time }}</p>
        <p class="status-bar-field">0 tasks</p>
        <p class="status-bar-field">{{ now.date }}</p>
    </div>
</template>