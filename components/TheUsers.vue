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
            :rmFromList="removeFromeList" />
    </div>

</template>

<script setup>
import { useUsers } from "@/store/users";  
import { useFilters } from "@/store/filters"; 
    const users = useUsers();
    const filter = useFilters()
    
    const {list, slider, closeSlider, currentIndex, currentItem, setCurrent} = useSlider(users)
    provide('usersSlider', {slider, closeSlider, currentIndex, setCurrent})

    const removeFromeList = (id) => {
        users.rmFromListById(id)
        filter.select(id)
    }
    
    onUnmounted(() => {
        //reset the filter by users
        users.resetFilteredByUsers()
    })
</script>

<style lang="scss">

</style>