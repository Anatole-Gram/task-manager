<template>

    <div class="content container">
        <transition name="preloader-averlay" type="animation">
            <div v-if="loader"
                class="content__overlay">
                <PreloaderCircle :quantityPoints="10" :pointsDiameter="4" :preloaderDiameter="35" />
            </div>
        </transition>
        <slot />
    </div>
        
</template>

<script setup>
    const props = defineProps({
        loader: {
            type: [Boolean]
        }
    })

</script>

<style lang="scss" scoped>
    .content {
        &__overlay {
            position: relative;
            z-index: 10;
            grid-area: main;
            background: {
                color: rgba(245, 245, 245, 1);
            };
        }
    }
    .preloader {
        width: 100px;
        height: 100px;
        left: calc(50% - 35px);
        top: calc(50% - 35px);
    }
</style>