<template>

        <div class="profile__box--black">
            <h6 v-text="`записка`" />

            <textarea v-if="editorState" 
                @input="emit('inInput', 'note', $event.target.value)"
                :value="note"
            />

            <p v-else v-text="note" />

            <h6 />
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

<style lang="scss" scoped>
    div {
        height: 100%;
            display: grid;
            grid-template-rows: 25px 1fr 25px;
            grid-template-columns: 30% 1fr 30%;
            grid-template-areas: 
                'left-top-corner top-center right-top-corner'
                'note note note' 
                'left-bottom-corner bottom-center right-bottom-corner';
            gap: 2px;
            padding: 8px;
            box-shadow: 1px -1px 4px 1px hsl(0deg 0% 39% / 40%), -1px 1px 4px 1px hsl(0deg 0% 39% / 40%);
    }

    textarea, p {
        grid-area: note;
        border-radius: 4px;
        padding: 16px;
        font: {
            family: 'Comforta';
            weight: 500;
            size: 14px;

        }
    }

    h6 {
        text: {
            align: center;
            }
         font: {
            size: 18px;
            family: 'Jura';
        }

        &:nth-of-type(1) {
            grid-area: top-center;
            clip-path: polygon(0% 100%, 15% 0%, 85% 0%, 100% 100%, 0% 100% );
        }
        &:nth-of-type(2) {
            grid-area: bottom-center;
            clip-path: polygon(0% 0%, 15% 100%, 85% 100%, 100% 0% );
        }
    }
</style>