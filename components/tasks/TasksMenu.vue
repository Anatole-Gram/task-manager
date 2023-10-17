<template>
    <div class="content__menu">
        <button @click="!managerCondition ? emit('createTask') : emit('closeManager')"> 
            {{ !managerCondition?'новая задача': 'к списку задач' }} 
        </button>
    </div>
</template>

<script setup>
    const props = defineProps({
        managerCondition: {
            type: [Boolean]
        }
    })
    const emit = defineEmits(['createTask', 'closeManager'])

</script>

<style lang="scss" scoped>
    button {
        color: rgba(255, 255, 255, 0.55);
        font: {
            family: 'Verdana';
            variant: small-caps;
        }
        &:hover {
            color: #fff;
        }
    }
    .content__menu {
        justify-content: space-around;
    }
</style>