<template>
    <Transition name="gradien-overlay"  @after-enter="afterEnter">
        <div v-show="animationAcive"> </div>
    </Transition>
</template>

<script setup>
    const props = defineProps({
        tracked: {}
    });
    const animationAcive = ref(false)
    watch(() => props.tracked, (newVal, oldVal) => {
        animationAcive.value = true
    })
    const afterEnter = (el => {
        animationAcive.value = false
    })
</script>

<style lang="scss" scoped>
    div {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: transparent;
        box-shadow: inset 1px 1px 3px 0 $mainBlack, inset -1px -1px 3px 0 $mainBlack;
    };
    @keyframes gragientOverlay {
        0% { 
            background: linear-gradient(90deg, $mainWhite 0%, transparent 100%);
        };
        50% {
            background: linear-gradient(90deg, $mainWhite 100%, $mainWhite 100%);
        }
        100% {
            background: linear-gradient(90deg, transparent 0%, $mainWhite 100%);
        };
    }
    .gradien-overlay {
         &-leave-active {
            animation: {
            name: gragientOverlay;
            duration: .25s;
            timing-function: ease-in-out;
            }
         }
    }
</style>