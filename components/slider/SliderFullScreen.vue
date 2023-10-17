<template>
        <button @click="defineCurrent(++idx)" class="arrow arrow--left"></button>
        <button @click="defineCurrent(--idx)" class="arrow arrow--right"></button>
</template>

<script setup>
    const props = defineProps({
        index: {
            type: [Number]
        },
        length: {
            type: [Number]
        }
    })
    const emit = defineEmits(['changeIndex'])

    const idx = ref(0)

    function defineCurrent(index) {
        if (index < 0) {
            idx.value = props.length
        }
        if (index > props.length) {
            idx.value = 0
        }
        emit('changeIndex', idx.value)
    }
    onMounted(() => {
        idx.value = props.index
    })
</script>

<style lang="scss" scoped>
    .arrow {
        position: absolute;
        width: 50px;
        height: 50px;
        top: calc(50% - 25px);
        background: {
            image: url('/img/btn/arrow.svg');
            repeat: no-repeat;
            size: contain;
        }
        &--left{
            right: 0;
        }
        &--right{
            transform: rotate(180deg);
            left: 0;
        }
    }
    button {
        opacity: 0.2;
        &:hover {
            opacity: 1;
        }
    }
</style>