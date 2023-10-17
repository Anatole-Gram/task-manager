<template>
    <div class="header-top">
        <a @click.prevent="$router.push('/login')" href="/">
            <img src="/img/pet.svg" alt="logo" class="logo">
        </a>
        <button @click="profile.logOut(), $router.push('/login')">сменить пользльзователя</button>
    </div>
</template>

<script setup>
import { useProfile } from '@/store/profile';


const profile = useProfile()

</script>

<style lang="scss" scoped>
    .header-top {
        display: flex;
        justify-content: space-between;
        & button {
            color: rgba(255, 255, 255, 0.55);
            font: {
                variant: small-caps;
                family: "Verdana";
                size: 16px;
                weught: 500;
            }
            &:hover {
                color: #fff;
            }
        }
    }
    .logo {
        width: 35px;
        height: 35px;
        margin-top: 8px;
    }
    
</style>