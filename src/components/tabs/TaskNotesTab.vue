<script setup>
    import { computed, ref } from 'vue'
    import { store } from '../../store'
    import { Note } from '../../classes'
    import { dateTimeString } from '../../util'

    const props = defineProps({
        taskId: {
            type: String,
            required: true,
        }
    })

    const task = computed(() => {
        return store.tasks.find((i) => i.id === props.taskId)
    })

    const isEditing = ref(false)
    const newNoteText = ref('')

    function cancel() {
        isEditing.value = false
        newNoteText.value = ''
    }
    function save() {
        const note = new Note(newNoteText.value)
        task.value.notes.unshift(note)
        cancel()
    }
    function remove(id) {
        const index = task.value.notes.findIndex((note) => {
            return note.id == id
        })
        task.value.notes.splice(index, 1)
    }
</script>

<template>
    <div v-if="!isEditing">
        <p>
            <button @click="isEditing = true">New note</button>
        </p>
    </div>
    <div v-else>
        <div class="field-row-stacked">
            <label :for="`note-textarea-${task.id}`">New note</label>
            <textarea :id="`note-textarea-${task.id}`" rows="3" v-model="newNoteText"></textarea>
        </div>
        <p>
            <button @click="save">Save</button> <button @click="cancel">Cancel</button>
        </p>
    </div>
    <div class="notes-container" v-for="note in task.notes" :key="note.id">
        <hr/>
        <p>
            {{ dateTimeString(note.date) }} <span style="float: right;"><a @click="remove(note.id)" style="color: red">X</a></span>
        </p>
        <p>{{ note.text }}</p>
    </div>
</template>

<style>
    textarea {
        resize: none;
    }
</style>