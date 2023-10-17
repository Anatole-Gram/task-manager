<template>
    <div class="content container">
        <TodosMenu 
            :slider="slider"
            @closeSlider="todos.slider=false" />
        <template v-if="slider">
            <TodosCurrentItem 
                :item="currentItem" 
                @updStatus="todos.updStatus" /> 
            <SliderFullScreen
                :index="todos.currentIndex" 
                :length="list.length-1" 
                @changeIndex="setCurent"
             />  
        </template>
        <TodosList v-else 
            :list="list"
            :sliderFrom="todos.sliderToggle" 
            :updStatus="todos.updStatus" />
    </div>
</template>

<script setup>
    import {useTodos} from '@/store/todos';
    const todos = useTodos()
    const list = computed(() => todos.filteredList)

    const {slider, closeSlider, currentItem, setCurent} = useSlider(todos)
    provide('slider', {slider, closeSlider})


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