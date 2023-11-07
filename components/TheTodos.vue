<template>

    <div class="content container">
        <TodosMenu 
            :slider="slider"
            @closeSlider="todos.slider=false" />

        <TodosCurrentItem v-if="slider"
            :item="currentItem" 
            @updStatus="todos.updStatus" /> 

        <TodosList v-else 
            :list="list"
            :sliderFrom="todos.sliderToggle" 
            :updStatus="todos.updStatus" />
    </div>
    
</template>

<script setup>
    import {useTodos} from '@/store/todos';
    const todos = useTodos()

    const {list, slider, closeSlider, currentIndex, currentItem, setCurrent} = useSlider(todos)
    provide('todosSlider', {slider, closeSlider, currentIndex, setCurrent})

    onMounted( async () => {
        await useTodoInit(localStorage.getItem('userId'))
    })

    onUnmounted(() => {
        //reset the filter by users
        todos.resetSelected()
    })
</script>


<style lang="scss" scoped>

</style>