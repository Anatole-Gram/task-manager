<template>
    <div class="main-box">
        <h4>задания пользователю:</h4>
        <ul>
            <TasksListTodosItem v-for="todo in list" :key="todo.id" 
                :todo="todo"
                :selected="current===todo.id"
                @click="emit('setCurrent', todo.id)"
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
        }
    })
    const emit = defineEmits(['setCurrent'])

</script>

<style lang="scss" scoped>
    div {
        display: grid;
        grid-template-rows: 24px 24px 1fr 24px;
        grid-template-columns: 1fr;
        gap: 8px;
        overflow: hidden;

        & h4 {
            grid-area: 1 / 1 / 2 / 2;
            font: {
                family: 'Roboto';
                size: 14px;
            }
            text-align: center;
        }
        & ul {
            overflow-y: auto;
        }
        &::before {
                content: '';
                display: block;
                height: 24px;
                @include arch(24px, $bgMainBlack);
            }
        &::after {
            content: '';
            display: block;
            height: 24px;
            @include arch(24px, $bgMainBlack);
            transform: rotate(180deg);
        }
    }
</style>