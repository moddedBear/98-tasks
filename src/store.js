import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const store = reactive({
    windows: [],
    tasks: [],
    spawnMainWindow() {
        const window = {
            id: uuidv4(),
            screen: 'welcome',
            title: '98 Tasks',
            width: '500px',
            initialX: 50,
            initialY: 50,
        }
        this.windows.push(window)
    },
    spawnNewTaskWindow() {
        const window = {
            id: uuidv4(),
            screen: 'newTask',
            title: 'New Task',
            width: '500px',
            initialX: 50,
            initialY: 50,
        }
        this.windows.push(window)
    },
    spawnTaskWindow(taskID) {
        const task = this.tasks.find((task) => task.id == taskID)
        const title = task.title
        const screenProps = {
            taskId: task.id
        }
        const window = {
            id: uuidv4(),
            screen: 'task',
            screenProps: screenProps,
            title: title,
            width: '500px',
            initialX: 50,
            initialY: 50,
        }
        this.windows.push(window)
    },
})