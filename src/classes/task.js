import { v4 as uuidv4 } from 'uuid'

const Task = class {
    id = uuidv4()
    title = 'New Task'
    description = ''
    logs = []
    notes = []
    todo = []
    blockers = []
    hours = 0
    completed = false
}

const Log = class {
    text = ''
    start = new Date()
    end
}

const Note = class {
    date = new Date()
    text = ''
}

const Todo = class {
    completed = false
    text = ''
}

export {Task, Log, Note, Todo}