<template>

        <div class="profile-note">
            <label for="user-note" class="profile-note__title text-label">записка</label>
            <textarea v-if="editorState" 
                @input="emit('inInput', 'note', $event.target.value)"
                :value="note"
                id="user-note"
                class="text-content"/>

            <p v-else v-text="note" 
                class="profile-note__text text-content"/>

            <h6 class="profile-note__stub"/>
        </div>

</template>

<script setup>
    const props = defineProps({
        note: {
            type: [String]
        },
        editorState: {
            type: [Boolean]
        }
    })
    const emit = defineEmits(['inInput'])
</script>

<style lang="scss">
</style>