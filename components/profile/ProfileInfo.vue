<template>
    <div class="content__main">
        <div class="profile">
            <section class="profile__main">
                <ProfileItemAva :url="`${useUrl()+user.img}`"  :editor="false"/>
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