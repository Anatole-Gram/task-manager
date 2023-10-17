<template>

    <div class="main-box">
        <h4>над задачей работают:</h4>
        <ul>
            <TasksListWorkersItem v-for="workerId in workers" :key="workerId"
                :worker="defineWorker(workerId)"
                :selected="current===workerId"
                @click="emit('setCurrent', workerId)"
            />
        </ul>
    </div>
</template>

<script setup>
    const props = defineProps({
        workers: {
            type: [Set]
        },
        current: {
            type: [Number]
        }
    })
    const emit = defineEmits(['setCurrent'])
    const defineWorker = useUserIdentifier()
</script>

<style lang="scss" scoped>
    div {
        display: grid;
        grid-template-rows: 24px 24px 1fr 24px;
        grid-template-columns: 1fr;
        gap: 8px;

        & h4 {
            grid-area: 1 / 1 / 2 / 2;
            font: {
                family: 'ROboto';
                size: 14px;
            }
            text-align: center;
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

