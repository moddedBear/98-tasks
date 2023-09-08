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
    <p v-if="!isEditing">{{ task.title }}</p>
    <div v-else>
        <div class="field-row-stacked">
            <label for="title">Title</label>
            <input type="text" v-model="editTitle" id="title"/>
        </div>
    </div>
    <hr/>
    <p v-if="!isEditing">{{ task.description }}</p>
    <div v-else>
        <div class="field-row-stacked">
            <label for="desc">Description</label>
            <textarea rows="3" v-model="editDesc" id="desc"/>
        </div>
    </div>
    <p>
        <input type="checkbox" id="completed" v-model="task.completed"/>
        <label for="completed">Completed?</label>
    </p>
    <div v-if="!isEditing">
        <button @click="toggleEditing">Edit</button>
    </div>
    <div v-else>
        <button @click="save">Save</button> <button @click="toggleEditing">Cancel</button>
    </div>
</template>