<script setup>
import { computed, ref } from 'vue'
import { store } from '../../store'
import { Todo } from '../../classes'

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
    const newBlockerText = ref('')

    function cancel() {
        isEditing.value = false
        newBlockerText.value = ''
    }
    function save() {
        const blocker = new Todo(newBlockerText.value)
        task.value.blockers.push(blocker)
        cancel()
    }
    function clearCompleted() {
        task.value.blockers = task.value.blockers.filter((blocker) => {
            return blocker.completed == false
        })
    }
</script>

<template>
    <div v-if="!isEditing">
        <p>
            <button @click="isEditing = true">New blocker</button> <button @click="clearCompleted" :disabled="task.completedBlockers.length == 0">Clear resolved</button>
        </p>
    </div>
    <div v-else>
        <div class="field-row-stacked">
            <label for="blocker-input">New blocker</label>
            <input type="text" v-model="newBlockerText"/>
        </div>
        <p>
            <button @click="save">Save</button> <button @click="cancel">Cancel</button>
        </p>
    </div>
    <fieldset v-if="task.uncompletedBlockers.length > 0">
        <legend>Unresolved</legend>
        <div class="field-row" v-for="blocker in task.uncompletedBlockers" :key="blocker.id">
            <input type="checkbox" v-model="blocker.completed" :id="`blocker${blocker.id}`"/>
            <label :for="`blocker${blocker.id}`">{{ blocker.text }}</label>
        </div>
    </fieldset>
    <fieldset v-if="task.completedBlockers.length > 0">
        <legend>Resolved</legend>
        <div class="field-row" v-for="blocker in task.completedBlockers" :key="blocker.id">
            <input type="checkbox" v-model="blocker.completed" :id="`blocker${blocker.id}`"/>
            <label :for="`blocker${blocker.id}`">{{ blocker.text }}</label>
        </div>
    </fieldset>
</template>