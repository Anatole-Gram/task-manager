<template>
    <div 
        class="preloader">

        <div v-for="(item, index) in quantityPoints" :key="index"
            :style="{
                left: points.get(item).x + 'px', top: points.get(item).y + 'px', 
                width: pointsDiameter+'px', height: pointsDiameter+'px',
                animationDelay: 0.2*index+'s',
            }"
             class="preloader__point" />
    </div>
</template>

<script setup>
    const props = defineProps({
        quantityPoints: {
            type: [Number]
        },
        pointsDiameter: {
            type: [Number]
        }, 
        preloaderDiameter: {
            type: [Number]
        }
    })

    const points = computed(()=> definePointsForCircle(props.quantityPoints, props.preloaderDiameter/2, props.pointsDiameter/2))
</script>

<style lang="scss" scoped>

    .preloader {
        position: absolute;
        &__point {
            position: absolute;
            border-radius: 50%;
            background: $mainBlack;

            animation: {
                name: preloaderCirclePoint;
                duration: 2.2s;
                timing-function: ease-out;
                iteration-count: infinite;
            };
        }
    }


</style>