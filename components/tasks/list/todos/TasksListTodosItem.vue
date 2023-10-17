<template>
    <li 
        class="list__item box"
        :class="{'box-black box-black--selected': selected}"
    >
        {{shortTitle}}
        <button v-show="selected" :disabled="!selected" @click.stop="remove"></button>
    </li>
</template>

<script setup>
    import { useTasks } from "@/store/tasks"

    const tasks = useTasks()

    const props = defineProps({
        todo: {
            type: [Object]
        },
        selected: {
            type: [Boolean]
        }
    })
    const shortTitle = computed(() => useTrimLine(props.todo.title, 35))

    const remove = async () => {
        const {id, taskId, destination} = props.todo
        await tasks.rmTodo(id, taskId, destination)
    }

</script>

<style lang="scss" scoped>
    li {
        position: relative;
        min-height: 24px;
        font: {
            family: 'Comforta';
            size: 12px;
        }
        & button {
            position: absolute;
            top: calc(50% - 8px);
            right: 8px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1px solid #fff;
            
            background: {
                image: url('/img/btn/remove.svg');
                repeat: no-repeat;
                position: center;
                size: 60%;
            }
            &:hover {
                transform: scale(1.2);
            }
        }
    }
</style>