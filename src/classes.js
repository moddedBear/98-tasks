import { v4 as uuidv4 } from 'uuid'
import { ref, computed } from 'vue'

const Task = class {
    id = uuidv4()
    title = 'New Task'
    description = ''
    logs = ref([])
    notes = []
    todos = ref([])
    uncompletedTodos = computed(() => {
        return this.todos.value.filter((todo) => {
            return !todo.completed
        })
    })
    completedTodos = computed(() => {
        return this.todos.value.filter((todo) => {
            return todo.completed
        })
    })
    blockers = []
    hours = computed(() => {
        let total = 0
        for (const log of this.logs.value) {
            if (!log.end) {
                continue
            }
            total += (log.end.getTime() - log.start.getTime()) / 1000 / 60 / 60
        }
        return total.toFixed(1)
    })
    completed = false
}

const Log = class {
    id = uuidv4()
    text = ''
    start = new Date()
    end
}

const Note = class {
    id = uuidv4()
    date = new Date()
    text = ''
    constructor(text) {
        this.text = text
    }
}

const Todo = class {
    id = uuidv4()
    completed = false
    text = ''
    constructor(text) {
        this.text = text
    }
}

export {Task, Log, Note, Todo}