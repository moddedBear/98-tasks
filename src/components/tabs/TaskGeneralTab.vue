<script setup>
    import { computed, ref } from 'vue'
    import { store } from '../../store'
    import TaskGeneralEdit from '../TaskGeneralEdit.vue';

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
    const editLinks = ref([])

    function toggleEditing() {
        if (!isEditing.value) {
            editTitle.value = task.value.title
            editDesc.value = task.value.description
            editLinks.value = []
            for (const link of task.value.links) {
                editLinks.value.push(link)
            }
            editLinks.value.push('')
        }
        isEditing.value = !isEditing.value
    }

    function save() {
        task.value.title = editTitle.value
        task.value.description = editDesc.value
        task.value.links = editLinks.value.filter((value) => {
            return value != ''
        })
        isEditing.value = false
    }

    function adjustLinks(index) {
        if (editLinks.value[index] == '' && index < editLinks.value.length - 1) {
            editLinks.value.splice(index, 1)
        }
        if (index == editLinks.value.length - 1 && editLinks.value[index] != '') {
            editLinks.value.push('')
        }
    }
</script>

<template>
    <div v-if="!isEditing">
        <p>
            <fieldset>
                <legend>Title</legend>
                <p>{{ task.title }}</p>
            </fieldset>
        </p>
        <p v-if="task.description">
            <fieldset>
                <legend>Description</legend>
                <p>{{ task.description }}</p>
            </fieldset>
        </p>
        <p v-if="task.links.length">
            <fieldset>
                <legend>Links</legend>
                <ul>
                    <li v-for="link in task.links" style="word-break: break-all"><a :href="link" target="_blank">{{ link }}</a></li>
                </ul>
            </fieldset>
        </p>
        <p>
            <input type="checkbox" id="completed" v-model="task.completed"/>
            <label for="completed">Completed?</label>
        </p>
    </div>
    <TaskGeneralEdit v-else :task-id="taskId" @dismiss="isEditing = false"/>
    <div v-if="!isEditing">
        <button @click="toggleEditing">Edit</button>
    </div>
</template>

<style scoped>
    fieldset p,ul {
        margin: 0;
    }
</style>