<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true,
        },
        yesCallback: {
            type: Function,
            required: false,
        },
        noCallback: {
            type: Function,
            required: false,
        }
    })

    const emit = defineEmits(['close'])

    function yes() {
        if (props.yesCallback) {
            props.yesCallback()
        }
        emit('close')
    }

    function no() {
        if (props.noCallback) {
            props.noCallback()
        }
        emit('close')
    }
</script>

<template>
    <p>{{ text }}</p>
    <p><button @click="yes">Yes</button> <button @click="no">No</button></p>
</template>

<style scoped>
    p {
        text-align: center;
    }
</style>