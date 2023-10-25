<template>
    <div class="arrow-box">
        <button 
            @click="emit('changeCurrent', (current-1))"
            class="arrow arrow--left" />
        <button 
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
        background: {
            image: url('/img/btn/arrow.svg');
            position: 50% 50%;
            repeat: no-repeat;
            size: contain;
        }
        &-box {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            display: grid;
            grid-template-columns: 50px 1fr 50px;
            grid-template-areas: 'leftBtn centalArea rightBtn';
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