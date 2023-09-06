import { reactive } from 'vue'

export const store = reactive({
    windows: [],
    nextWindowId: 0,
    tasks: [],
    spawnWindow() {
        const id = this.takeWindowId()
        const props = {
            id: id,
            title: '98 Tasks',
            width: '500px',
            initialX: 50,
            initialY: 50,
        }
        this.windows.push(props)
    },
    takeWindowId() {
        this.nextWindowId++
        return this.nextWindowId
    }
})