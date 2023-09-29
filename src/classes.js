import { v4 as uuidv4 } from 'uuid'
import { ref, computed } from 'vue'

const Task = class {
    id = uuidv4()
    title = 'New Task'
    description = ''
    links = []
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
    blockers = ref([])
    uncompletedBlockers = computed(() => {
        return this.blockers.value.filter((blocker) => {
            return !blocker.completed
        })
    })
    completedBlockers = computed(() => {
        return this.blockers.value.filter((blocker) => {
            return blocker.completed
        })
    })
    hoursUpdateTime = ref(new Date())
    hours = computed(() => {
        let total = 0
        for (const log of this.logs.value) {
            if (!log.end) {
                total += (this.hoursUpdateTime.value.getTime() - log.start.getTime()) / 1000 / 60 / 60
            }
            else {
                total += (log.end.getTime() - log.start.getTime()) / 1000 / 60 / 60
            }
        }
        return total.toFixed(1)
    })
    isWorking = computed(() => {
        return this.logs.value.some((log) => {
            return log.end === undefined
        })
    })
    completed = false
    constructor(title = '', description = '', links = []) {
        this.title = title
        this.description = description
        this.links = links
    }
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

const Settings = class {
    behavior = {
        openAfterCreate: false,
        confirmTaskDeletion: true,
    }
    customization = {
        background: {
            use: false,
            type: 'color',  // color, image, gradient
            color: '#008080',
            image: '',
            gradient: {
                angle: 90,
                color1: 'navy',
                color2: '#1084d0',
            }
        },
        titleBar: {
            use: false,
            color1: 'navy',
            color2: '#1084d0',
            textColor: 'white',
        },
        window: {
            use: false,
            background: 'silver',
            textColor: '#222',
        },
    }
}

export {Task, Log, Note, Todo, Settings}
