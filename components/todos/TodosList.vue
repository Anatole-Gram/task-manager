<template>
    <div class="content__main">
        <ul class="list box">
            <transition-group 
                type="animation"
                name="interactive-list"
                @enter="onEnter"
                @beforeEnter="onBeforeEnter"
                @beforeLeave="onBeforeLeave">
                <TodosListItem v-for="(todo, index) in list" :key="todo.id" 
                    :data-index="index"
                    :todo="todo"
                    :sender="todoSender.identify(todo.sender)" 
                    :selected="current===todo.id"
                    @sliderReverse="sliderFrom(index)"
                    @removeFromList="rmFromList(todo.id)"
                    @reverseStatus="updStatus(todo.id)"
                    @click="setCurrent(todo.id)" />
            </transition-group>

        </ul>
    </div>
</template>

<script setup>
    import { useUsers } from "@/store/users"

    const users = useUsers()

    const props = defineProps({
        list: {
            type: [Array]
        },
        sliderFrom: {
            type: [Function]
        },
        updStatus: {
            type: [Function]
        },
    })
    
    const {current, setCurrent} = useInteractiveList()
    const todoSender = useTodoSenderIdentifier()
    // animation for list item
    let {counterDelays, delayMult, onBeforeEnter, onEnter, onBeforeLeave} = useAnimationDelayFromList(0.03, ()=> props.list.length)

</script>

<style lang="scss">

</style>