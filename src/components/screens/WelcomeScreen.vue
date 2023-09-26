<script setup>
    import { onMounted, reactive, ref, computed } from 'vue'
    import TaskRow from '../TaskRow.vue';
    import { store } from '../../store'
    import { dateTimeString } from '../../util'

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
        now.value = dateTimeString(n)
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

    const headers = ['Status', 'Title', 'Hours', 'Todo', 'Blockers']
    const sortingMethods = [sortByStatus, sortByTitle, sortByHours, sortByTodos, sortByBlockers]
    const activeSort = ref(0)
    const sortOrder = ref(-1)
    const sortedTasks = computed(() => {
        return store.tasks.toSorted(sortingMethods[activeSort.value])
    })

    function setSortingMethod(index) {
        console.log(index)
        if (activeSort.value == index) {
            sortOrder.value = sortOrder.value * -1
        }
        else {
            activeSort.value = index
            if (index == 1) {
                sortOrder.value = 1
            }
            else {
                sortOrder.value = -1
            }
        }
    }
    
    function sortByStatus(a, b) {
        let score = 0
        if (a.completed) {
            score -= 2
        }
        if (b.completed) {
            score += 2
        }
        if (a.logs.some((log) => {return log.end === undefined})) {
            score += 1
        }
        if (b.logs.some((log) => {return log.end === undefined})) {
            score -= 1
        }
        if (score == 0) {
            return sortByTitle(a, b) * sortOrder.value
        }
        return score * sortOrder.value
    }

    function sortByTitle(a, b) {
        return a.title.localeCompare(b.title) * sortOrder.value
    }

    function sortByHours(a, b) {
        const result = (a.hours - b.hours) * sortOrder.value
        if (result == 0) return sortByTitle(a, b) * sortOrder.value
        return result
    }

    function sortByTodos(a, b) {
        const result = (a.uncompletedTodos.length - b.uncompletedTodos.length) * sortOrder.value
        if (result == 0) return sortByTitle(a, b) * sortOrder.value
        return result
    }

    function sortByBlockers(a, b) {
        const result = (a.uncompletedBlockers.length - b.uncompletedBlockers.length) * sortOrder.value
        if (result == 0) return sortByTitle(a, b) * sortOrder.value
        return result
    }

    function sortIndicator(index) {
        if (sortOrder.value == -1) return '⏷'
        return '⏶' 
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
                    <th v-for="(header, index) in headers" @click="setSortingMethod(index)" :class="{ 'full-width': header == 'Title' }"><span class="sort-indicator" v-if="index == activeSort">{{ sortIndicator(index) }}</span>{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <TaskRow v-for="task in sortedTasks" :key="task.id" :task="task"></TaskRow>
            </tbody>
        </table>
    </div>

    <div class="status-bar">
        <p class="status-bar-field">{{ completedTasks.length }}/{{ store.tasks.length }} completed</p>
        <p class="status-bar-field">{{ activeTasks.length }}/{{ store.tasks.length }} active</p>
        <p class="status-bar-field">{{ now }}</p>
    </div>
</template>

<style scoped>
    th {
        cursor: pointer;
    }
    th.full-width {
        width: 100%;
    }
    span.sort-indicator {
        margin-right: 2px;
    }
</style>