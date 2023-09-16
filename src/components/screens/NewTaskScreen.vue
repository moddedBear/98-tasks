<script setup>
    import TaskGeneralEdit from '../TaskGeneralEdit.vue';

    const emit = defineEmits(['close'])
</script>

<template>
    <TaskGeneralEdit @dismiss="$emit('close')"/>
</template>