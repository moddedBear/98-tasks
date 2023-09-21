import { reactive, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const store = reactive({
    windows: [],
    tasks: [],
    cursorX: 0,
    cursorY: 0,
    getNewWindowCoords() {
        const x = window.innerWidth - this.cursorX > 500 ? this.cursorX + 40 : this.cursorX - 250
        const y = this.cursorY > 60 ? this.cursorY  - 50 : this.cursorY
        return [x, y]
    },
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
        const coords = this.getNewWindowCoords()
        const window = {
            id: uuidv4(),
            screen: 'newTask',
            title: 'New Task',
            width: '400px',
            initialX: coords[0],
            initialY: coords[1],
        }
        this.windows.push(window)
    },
    spawnTaskWindow(taskID) {
        const task = this.tasks.find((task) => task.id == taskID)
        const title = task.title
        const screenProps = {
            taskId: task.id
        }
        const coords = this.getNewWindowCoords()
        const window = {
            id: uuidv4(),
            screen: 'task',
            screenProps: screenProps,
            title: title,
            width: '500px',
            initialX: coords[0],
            initialY: coords[1],
        }
        this.windows.push(window)
    },
    spawnYesNoDialogWindow(title, text, yesCallback = undefined, noCallback = undefined) {
        let screenProps = {
            text: text,
        }
        if (yesCallback) {
            screenProps.yesCallback = yesCallback
        }
        if (noCallback) {
            screenProps.noCallback = noCallback
        }
        const coords = this.getNewWindowCoords()
        const window = {
            id: uuidv4(),
            screen: 'yesNoDialog',
            screenProps: screenProps,
            title: title,
            width: '250px',
            initialX: coords[0],
            initialY: coords[1],
        }
        this.windows.push(window)
    },
    spawnAboutWindow() {
        const x = Math.floor(window.innerWidth / 2) - 150
        const y = Math.floor(window.innerHeight / 2) - 100
        const w = {
            id: uuidv4(),
            screen: 'about',
            title: 'About 98 Tasks',
            width: '300px',
            initialX: x,
            initialY: y,
        }
        this.windows.push(w)
    }
})