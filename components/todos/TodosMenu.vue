<template>
    <div class="content__menu">

        <template v-if="!slider">
        <FilterForUsers @filterForSelected="todos.filterForSelected" />
        <FilterForCondition :condition="menuCondition"  @returnCondition="(property)=>condition=property" />
        </template>

        <SliderMenu 
            sliderName="todosSlider"/>

    </div>
</template>

<script setup>
    import { useTodos } from "@/store/todos"

const props = defineProps({
    slider: {
        type: [Boolean]
    }, 
    sliderName: {
        ttype: [String]
    }
})

    const todos = useTodos()

    const menuCondition = reactive({
        name: ['все', 'завершено', 'не завершено'],
        prop: [null, true, false]
    })
    const condition =  toRef(todos, 'condition')
</script>