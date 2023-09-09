import { v4 as uuidv4 } from 'uuid'
import { ref, computed } from 'vue'

const Task = class {
    id = uuidv4()
    title = 'New Task'
    description = ''
    logs = []
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
    hours = 0
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