

<template>
    <button v-if="active" v-text="'выберите изображение'"
        @click="loader=true"
        class="btn box-black"> </button>

<ClientOnly>
    <Teleport to=".content" :disabled="false">
        <div v-if="loader"
            class="loader-modal">

            <ButtonClose 
                :topRight="[45, 8]"
                @closeAction="()=>loader=false" />

                <div class="loader__content-wraper">
                    <img src="" alt="user photo">
                    <div class="loader__menu">
                        <input type="file">
                    </div>
                    
                    <!-- <canvas ref="canvasElement" width="200" height="200"></canvas>     -->
                </div>
        </div>
    </Teleport>
</ClientOnly>

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
    .loader-modal {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    button {
        margin: 8px;
        color: rgba(255, 255, 255, 0.55);
        &:hover {
            color: #fff;
        }
    }
    canvas {
        border: 2px solid black;
        width: 200px;
        height: 200px;
        }
</style>