<template>
    <div class="content__main box">
        <ul class="list">
            <TasksListItem v-for="task in list" :key="task.id" 
                :menuBtns="['удалить', 'открыть']"
                :task="task"
                :selected="current===task.id"
                @click="emit('target', task.id)"
                @edit="editTask(task.id)"
                @remove="removeTask"
            />
        </ul>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: {
            type: [Array]
        }, 
        current: {
            type: [Number]
        },
        editTask: {
            type: [Function]
        }
    })
    const emit = defineEmits(['target'])

    const {removeTask} = inject('task')

</script>

<style lang="scss" scoped>

</style>