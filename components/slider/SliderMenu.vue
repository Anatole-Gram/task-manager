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
        margin: 0 auto;
        font: {
            family: 'Roboto';
            size: 14px;
        }
    }
    .arrow {
        &-box {
            grid-template-columns: 50px 1fr 50px;
            grid-template-rows: 100%;
            grid-template-areas: 'leftBtn centralArea rightBtn';
        }
    }
</style>
<style lang="scss">
button {
    @include standartBtn;
}
</style>