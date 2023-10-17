<template>
    <input type="text"
        @input="updateExpFromSearch($event.target.value)"
    >

</template>

<script setup>
    const emit = defineEmits(['startSearch', 'update:searchState'])
    const expForSeacrh = ref(false)
    const updateExpFromSearch = str => str !== "" ? expForSeacrh.value = new RegExp(`^${str}`, 'gi') : expForSeacrh.value = false;
    watch(()=>expForSeacrh.value, (newVal)=>{
        emit('update:searchState', newVal)
        if(newVal) {
            emit('startSearch', newVal)
        }
    })
   
</script>

<style lang="scss">

</style>