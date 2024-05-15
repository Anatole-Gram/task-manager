<template>
    <div class="profile-info">
        <ul class="profile-info__list">
            <li>
                <h3 class="text-title">{{user.name}} {{user.surname}}</h3> 
            </li>
            <li> 
                <p class="text-content"> <span>должность: </span> {{user.position}} </p> 
            </li>
            <li> 
                <p class="text-content"> <span>телефон: </span> {{user.phone}} </p> 
            </li>
            <li> 
                <p class="text-content"> <span>почта: </span> {{user.mail}} </p> 
            </li>

        </ul>
    </div>
</template>

<script setup> 
    const props = defineProps({
        user: {
            type: [Object]
        },
        editorState: {
            type: [Boolean]
        }
    })
</script>

<style lang="scss" scoped> 
    span {
        font-weight: 600;
    }
</style>