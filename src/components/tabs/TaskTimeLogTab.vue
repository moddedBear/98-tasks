<script setup>
    import { computed } from 'vue'
    import { store } from '../../store'
    import { Log } from '../../classes/task'
    import { timeDateString } from '../../util'

    const props = defineProps({
        taskId: {
            type: String,
            required: true,
        }
    })

    const task = computed(() => {
        return store.tasks.find((i) => i.id === props.taskId)
    })
    const isWorking = computed(() => {
        return task.value.logs.some((log) => {
            return log.end === undefined
        })
    })

    function timeIn() {
        const log = new Log()
        task.value.logs.unshift(log)
    }
    function timeOut() {
        const log = task.value.logs.find((log) => {
            return log.end === undefined
        })
        log.end = new Date()

        // update task hours
        let hours = 0
        for (const log of task.value.logs) {
            if (!log.end) {
                console.error('Looks like a time log is missing an end time')
                continue
            }
            hours += (log.end.getTime() - log.start.getTime()) / 1000 / 60 / 60
        }
        task.value.hours = hours.toFixed(1)
    }
</script>

<template>
    <p>You are {{ isWorking ? '' : 'NOT' }} currently working on this task.</p>
    <p><button :disabled="isWorking" @click="timeIn">Time In</button> <button :disabled="!isWorking" @click="timeOut">Time Out</button></p>
    <div class="log-container" v-for="log in task.logs" :key="log.id">
        <hr/>
        <div class="time-container">
            <div>
                <p>In <span class="sunken-panel">{{ timeDateString(log.start) }}</span></p>
            </div>
            <div>
                <p>Out <span class="sunken-panel">{{ log.end ? timeDateString(log.end) : '—' }}</span></p>
            </div>
        </div>
        <div class="field-row">
            <label>Note</label>
            <input type="text" v-model="log.text" style="width: 100%"/>
        </div>
    </div>
</template>

<style scoped>
    .time-container {
        display: flex;
        flex-direction: row;
    }
    
    .time-container div {
        display: flex;
        flex: 1 0 0;
    }

    .time-container span.sunken-panel {
        padding: 2px;
    }
</style>