<template>
    <div class="arrow-box">
        <ButtonArrow
            @click="emit('changeCurrent', (current-1))"
            class="arrow arrow--left" />
        <ButtonArrow
            @click="emit('changeCurrent', (current+1))"
            class="arrow arrow--right" />
    </div>
</template>

<script setup>
    const props = defineProps({
        current: {
            type: [Number]
        }
    })
    const emit = defineEmits(['changeCurrent'])
</script>

<style lang="scss" scoped>
    .arrow {
        
        &-box {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            display: grid;
            grid-template-columns: 50px 1fr 50px;
            grid-auto-rows: 100%;
            grid-template-areas: 'leftBtn centralArea rightBtn';
        }
        &--left {
            grid-area: leftBtn;
            transform: rotate(180deg);
        }
        &--right {
            grid-area: rightBtn;
        }
    }
</style>

<style lang="scss">
    .arrow {
        svg path {
            fill: red;
        }
    }
</style>