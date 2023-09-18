<script setup>
    import { onMounted, ref, toRaw } from 'vue'
    import { store } from '../store'
    import WelcomeScreen from './screens/WelcomeScreen.vue'
    import TaskScreen from './screens/TaskScreen.vue'
    import NewTaskScreen from './screens/NewTaskScreen.vue'
    import DialogYesNoScreen from './screens/DialogYesNoScreen.vue'

    const props = defineProps({
        screen: {
            type: String,
            required: true,
        },
        screenProps: {
            type: Object,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true
        },
        width: {
            type: String,
            required: true
        },
        initialX: {
            type: Number,
            required: false
        },
        initialY: {
            type: Number,
            required: false
        }
    })

    const emit = defineEmits(['raise'])

    const cursorX = ref(-1)
    const cursorY = ref(-1)
    const posX = ref(props.initialX)
    const posY = ref(props.initialY)
    const minimized = ref(false)
    const height = ref(0)

    defineExpose({ height, props })

    onMounted(() => {
        emit('raise', props.id)
    })

    function startDrag(e) {
        document.onmouseup = stopDrag
        document.onmousemove = drag
        cursorX.value = e.clientX
        cursorY.value = e.clientY
        document.body.style.cursor = "grabbing"
    }
    function stopDrag() {
        document.onmouseup = null
        document.onmousemove = null
        document.body.style.cursor = "initial"
    }
    function drag(e) {
        posX.value -= cursorX.value - e.clientX
        posY.value -= cursorY.value - e.clientY
        cursorX.value = e.clientX
        cursorY.value = e.clientY
    }
    function minimize() {
        minimized.value = !minimized.value
    }
    function close() {
        const index = store.windows.findIndex((window) => {
            return toRaw(window).id === props.id
        })
        if (index === -1) console.error('ah geez')
        store.windows.splice(index, 1)
    }
</script>

<template>
    <div class="window" @mousedown="$emit('raise', id)" :style="{ width: width, top: posY+'px', left: posX+'px', zIndex: height }">
        <div class="title-bar" @mousedown.self="startDrag">
            <div class="title-bar-text" @mousedown.self="startDrag">{{ title }}</div>
            <div class="title-bar-controls">
                <button aria-label="Minimize" @click="minimize"></button>
                <button aria-label="Close" @click="close" v-if="screen != 'welcome'"></button>
            </div>
        </div>
        <div class="window-body" v-show="!minimized">
            <WelcomeScreen v-if="screen == 'welcome'" />
            <TaskScreen v-else-if="screen == 'task'" :task-id="screenProps.taskId" @close="close" />
            <NewTaskScreen v-else-if="screen == 'newTask'" @close="close" />
            <DialogYesNoScreen v-else-if="screen== 'yesNoDialog'" :text="screenProps.text" :yes-callback="screenProps.yesCallback" :no-callback="screenProps.noCallback" @close="close" />
        </div>
    </div>
</template>

<style scoped>
    .window {
        position: absolute;
    }
    .title-bar {
        cursor: grab;
        -webkit-user-select: none;
        user-select: none;
    }
    .title-bar:active {
        cursor: inherit;
    }
</style>