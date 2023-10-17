<template>
    <li
        class="box list__item"
        :class="{'box-black box-black--selected': selected}"
    >
        {{worker.name.toLowerCase()}}
    </li>
</template>

<script setup>
    const props = defineProps({
        worker: {
            type: [Object]
        },
        selected: {
            type: [Boolean]
        }
    })
</script>

<style lang="scss" scoped>
    li {
        height: 24px;
        font: {
            family: 'Comforta';
            size: 12px;
        }
    }
    
</style>