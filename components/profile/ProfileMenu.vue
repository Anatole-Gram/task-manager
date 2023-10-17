<template>
    <div class="content__menu">
       <button 
            class="menu-content__btn"
            @click="emit('editorToggle')">{{`${!editor?'редакторивать':'отменить'}`}}
        </button>
       <button v-if="editor"
            class="menu-content__btn"
            :class="{'menu-content__btn--inactive': !updateAllowed}"
            :disabled="!updateAllowed"
            @click="emit('update')"
            v-html="'сохранить'" />

    </div>
</template>
<script setup>
    const props = defineProps({
        editor: {
            type: [Boolean]
        },
        updateAllowed: {
            type: [Boolean]
        }
    })

    const emit = defineEmits(['editorToggle', 'update'])

</script>
<style lang="scss" scoped>

    .content__menu {
        justify-content: space-around;
    }

</style>