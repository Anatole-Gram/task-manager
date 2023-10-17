<template>
    <div class="header">
        <div class="container"><HeaderTopRow /></div>
        <div class="container"><HeaderNavigation /></div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.header {
    grid-area: header;
    min-height: 50px;
    background: {
        color: #212529;
    }
}
</style>