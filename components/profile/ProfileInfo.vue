<template>
    <div class="content__main">
        <div class="profile">
            <section class="profile__main">
                <ProfileItemAva :url="user.img" />
                <ProfileItemInfo :user="user" :editor-state="false" />
            </section>

            <section class="profile__additional box">
                <ProfileItemAdditional />
            </section>

            <section class="profile__note box">
                <ProfileItemNote :note="user.note" :editor-state="false" />    
            </section>
            
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        user: {
            type: [Object]
        }
    })

    // watch(() => props.user, (newVal, oldVal) => {
    //     console.log(`USER: ${newVal}`)
    // })
</script>

<style lang="scss">

    .profile {
        &__main {
            
            &-ava {
                width: 200px;
                height: 200px;
                border-radius: 4px;
            }
        }
    }
    
</style>