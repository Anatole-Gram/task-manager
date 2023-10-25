<template>
    <div class="content__menu">

        <template v-if="!slider">
            <FilterForUsers 
                @filterForSelected="users.filteredForSelected" />
        </template>

        <SliderMenu
            sliderName="usersSlider" />
        
    </div>
</template>

<script setup>

import { useUsers } from "@/store/users";
const users = useUsers()

const props = defineProps({
    slider: {
        type: [Boolean]
    }, 
    sliderName: {
        ttype: [String]
    }
})
const emit = defineEmits(['close'])

</script>

<style lang="scss" scoped>
p {
    color: red;
}
</style>