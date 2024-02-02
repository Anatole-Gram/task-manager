

<template>
    <button v-if="active" v-text="'выберите изображение'"
        @click="loader=true"
        class="box-black"> </button>

    <!-- <Teleport to=".footer" :disabled="false">
        <div v-if="loader">
            <h1> teleported loader  </h1>
            <button 
                @click="loader=false">Close</button>
        </div>
    </Teleport> -->

</template>

<script setup>
    const props = defineProps({
        active: {
            type: [Boolean]
        }
    })
    const loader = ref(false)
</script>

<style lang="scss" scoped>
    div {
        width: 100%;
        height: 100%;
        background-color: red;
    }
</style>