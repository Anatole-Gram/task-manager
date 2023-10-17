<template>
    <div class="todo-menu box box-black" >
        <select class="todo-menu__item box-black" v-model="current">
            <option value="0">выберите пользователя</option>
            <option v-for="user in users.list" :key="user.id" :value="user.id">{{user.name}} {{user.surname}}</option>
        </select>
        <button disabled class="todo-menu__item box-black">сбросить</button>
        <button 
            :disabled="!allowSend"
            @click.prevent="emit('sendTodo', Boolean(currentWorker))"
            class="todo-menu__item box-black" :class="{'not-active': !allowSend}">сохранить</button>
    </div>
</template>

<script setup>
    import { useUsers } from "@/store/users";
    const users = useUsers()
    
    const props = defineProps({
        allowSend: {
            type: [Boolean]
        }
    })
    const emit = defineEmits(['sendTodo'])

    const {currentWorker, setCurrentWorker} = inject('worker') 
    const current = computed({
        set: value => setCurrentWorker(value), 
        get: () => currentWorker.value 
        })
    
</script>

<style lang="scss" scoped>
    .todo-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        padding: 0 8px;
        &__item {
            min-width: 175px;
            height: 42px;
            border-radius: 4px;
        }
    }
    .not-active {
        color: red;
    }
</style>