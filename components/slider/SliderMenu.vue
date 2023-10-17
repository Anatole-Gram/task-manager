<template>
    <button v-if="slider"
        class="slider__btn-close"
        @click="closeSlider">
           перейти к списку
        </button>
</template>

<script setup>

    const {closeSlider, slider} = inject('slider')

</script>

<style lang="scss" scoped>

</style>