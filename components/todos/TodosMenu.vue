<template>
    <div class="content__menu">

        <template v-if="!slider">
        <FilterForUsers @filterForSelected="filterByUsers" />
        <FilterForCondition :conditionMap="conditionMap"  @returnCondition="(property)=>condition=property" />
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

    const { filterByUsers } = useTodos()

    const conditionMap = ref(new Map([[null, 'все'], [true, 'завершено'], [false, 'не завершено']]))
</script>