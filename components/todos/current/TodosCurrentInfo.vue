<template>
    <section>
        <p> <span>Задание от:</span> {{ `${sender.name} (${sender.position})` }} </p>
        <p> <span>создано:</span> {{ created }} </p>
    </section>
</template>

<script setup>
import { MyDate } from '~~/composables/_date'

    const props = defineProps({
        userId: {
            type: [Number]
        },
        date: {
            type: [String]
        }
    })

    const todoSender = useTodoSenderIdentifier()
    const sender = computed(() => todoSender.identify(props.userId))
    const created = new MyDate(props.date).getFullDate()
</script>

<style lang="scss" scoped>
    section {
        display: flex;
        justify-content: space-between;
        margin: 0 8px;
        font: {
            size: 16px;
            family: "Roboto";
        };
    }
</style>