<template>

    <div class="content container">
        <UsersMenu 
            @close="users.slider=false" 
            :slider="slider" />

        <ProfileInfo v-if="slider" 
            :user="currentItem" />

        <UsersList v-else 
            :list="list" 
            :sliderFrom="users.sliderToggle" 
            :rmFromList="users.selectUser" />
    </div>

</template>

<script setup>
import { useUsers } from "@/store/users";   
    const users = useUsers();
    
    const {list, slider, closeSlider, currentIndex, currentItem, setCurrent} = useSlider(users)
    provide('usersSlider', {slider, closeSlider, currentIndex, setCurrent})

</script>

<style lang="scss">

</style>