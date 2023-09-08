<script setup>
    import { computed, ref } from 'vue'
    import { store } from '../../store'

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
    const editTitle = ref('')
    const editDesc = ref('')

    function toggleEditing() {
        if (!isEditing.value) {
            editTitle.value = task.value.title
            editDesc.value = task.value.description
        }
        isEditing.value = !isEditing.value
    }

    function save() {
        task.value.title = editTitle.value
        task.value.description = editDesc.value
        isEditing.value = false
    }
</script>

<template>
    <div class="field-row-stacked">
        <label for="title">Title</label>
        <p v-if="!isEditing">{{ task.title }}</p>
        <input type="text" v-else v-model="editTitle" id="title"/>
    </div>
    <hr/>
    <div class="field-row-stacked">
        <label for="desc">Description</label>
        <p v-if="!isEditing">{{ task.description }}</p>
        <input type="textarea" v-else v-model="editDesc" id="desc"/>
    </div>
    <input type="checkbox" id="completed" v-model="task.completed"/>
    <label for="completed">Completed?</label>
    <div v-if="!isEditing">
        <button @click="toggleEditing">Edit</button>
    </div>
    <div v-else>
        <button @click="save">Save</button>
        <button @click="toggleEditing">Cancel</button>
    </div>
</template>