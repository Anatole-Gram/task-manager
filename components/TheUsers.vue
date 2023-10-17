<template>

    <div class="content container">

        <UsersMenu 
            @close="users.slider=false"
            :slider="slider" />

        <template v-if="slider"> 

            <ProfileInfo  :user="currentItem" />

            <SliderFullScreen 
                :index="users.currentIndex" 
                :length="list.length-1" 
                @changeIndex="setCurent"
            />

        </template>

        <UsersList v-else 
            :list="list" 
            :sliderFrom="users.sliderToggle" 
            :rmFromList="users.selectUser" />

    </div>

</template>

<script setup>
import { useUsers } from "@/store/users";   
    const users = useUsers();
    
    
    const list = computed (() => users.filteredList)   
    const selected = computed(()=> users.selected)

    const {slider, closeSlider, currentItem, setCurent} = useSlider(users)
    provide('slider', {slider, closeSlider})

    onUnmounted(() => {
        // reset the filter by users
    users.resetSelected()
    })

</script>

<style lang="scss">

</style>