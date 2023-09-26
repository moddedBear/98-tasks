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
    const newTodoText = ref('')

    function cancel() {
        isEditing.value = false
        newTodoText.value = ''
    }
    function save() {
        if (newTodoText.value.trim() == '') return
        const todo = new Todo(newTodoText.value)
        task.value.todos.push(todo)
        cancel()
    }
    function clearCompleted() {
        task.value.todos = task.value.todos.filter((todo) => {
            return todo.completed == false
        })
    }
</script>

<template>
    <div v-if="!isEditing">
        <p>
            <button @click="isEditing = true">New todo</button> <button @click="clearCompleted" :disabled="task.completedTodos.length == 0">Clear completed</button>
        </p>
    </div>
    <div v-else>
        <div class="field-row-stacked">
            <label :for="`todo-input-${task.id}`">New todo</label>
            <input type="text" v-model="newTodoText" :id="`todo-input-${task.id}`" @keyup.enter="save"/>
        </div>
        <p>
            <button @click="save" :disabled="newTodoText.trim() == ''">Save</button> <button @click="cancel">Cancel</button>
        </p>
    </div>
    <fieldset v-if="task.uncompletedTodos.length > 0">
        <legend>Uncompleted</legend>
        <div class="field-row" v-for="todo in task.uncompletedTodos" :key="todo.id">
            <input type="checkbox" v-model="todo.completed" :id="`todo${todo.id}`"/>
            <label :for="`todo${todo.id}`">{{ todo.text }}</label>
        </div>
    </fieldset>
    <fieldset v-if="task.completedTodos.length > 0">
        <legend>Completed</legend>
        <div class="field-row" v-for="todo in task.completedTodos" :key="todo.id">
            <input type="checkbox" v-model="todo.completed" :id="`todo${todo.id}`"/>
            <label :for="`todo${todo.id}`">{{ todo.text }}</label>
        </div>
    </fieldset>
</template>