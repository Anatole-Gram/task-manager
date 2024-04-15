<template>
   <div class="loader-img__menu">
    <hr>
    <button
         @click="emit('cropImg')"
         class="box-black btn">Обрезать изображение</button>
    <button
        :disabled="!avaBlob"
        @click="emit('saveCropped')"
        class="box-black btn"
        :class="{'menu-content__btn--inactive': !avaBlob}">
            сохранить изображение
        </button>
   </div>
</template>

<script setup> 
    const emit = defineEmits(['cropImg', 'saveCropped'])
    const {avaBlob} = inject('profile')
</script>

<style lang="scss" scoped>
    hr {
        width: 100%; 
        height: 1px;
        position: absolute; 
        left: 0;
        top: 0;
    }
</style>