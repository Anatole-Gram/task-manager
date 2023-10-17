<template>
    <div class="content__main">

        <TasksManagerEditor v-if="task.id" 
            :task="taskTemplate"
        />
 
        <TasksManagerCreator v-else 
            :menuBtn="['сбросить', 'добавить задачу']"
            @create="create"
        />

    </div>
</template>

<script setup>
    const props = defineProps({
        task: {
            type: [Object]
        },
        create: {
            type: [Function]
        }
    })

    const taskTemplate = computed(() => Object.create(props.task))

</script>

<style lang="scss" scoped>

</style>