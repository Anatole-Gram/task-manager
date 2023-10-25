<template>
    <template v-if="slider">
    <SliderArrows 
        :current="currentIndex"
        @changeCurrent="setCurrent" />
    <button
        class="slider__btn-close"
        @click="closeSlider">
           перейти к списку
        </button>
    </template>
</template>

<script setup>
const props = defineProps({
    sliderName: {
        type: [String]
    }
})

    const {slider, closeSlider, currentIndex, setCurrent} = inject(props.sliderName)

</script>

<style lang="scss" scoped>
    .slider__btn-close {
        z-index: 2;
    }
</style>