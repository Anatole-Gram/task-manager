<template>

<button
    @click.prevent="emit('closeAction')"
    :style="{top: topRight[0]+'px', right: topRight[1]+'px'}"
    class="bnt-close btn-circle">
</button>

</template>

<script setup>
const props = defineProps({
    topRight: {
        type: [Array]
    }
})
const emit = defineEmits(['closeAction'])
</script>

<style lang="scss" scoped>
.bnt-close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    background: {
        color: rgba(255,255,255);
        image: url(/img/btn/close-win.svg);
        size: 70%;
        repeat: no-repeat;
        position: center;
    }
    &:hover {
        transform: scale(1.1);
        transition-delay: 0.2s;
        }
}
</style>