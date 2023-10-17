<template>
    <nav class="header-nav">
        <nuxt-link to="/" class="text-btn">главная</nuxt-link>
        <nuxt-link to="/users" class="text-btn">пользователи</nuxt-link>
        <nuxt-link to="/todos" class="text-btn">задания</nuxt-link>
        <nuxt-link to="/tasks" class="text-btn">мои задачи</nuxt-link>
    </nav>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.header-nav {
    display: flex;
    justify-content: space-between;

    padding: {
        bottom: 8px;
    }
}

a {
    font: {
        variant: small-caps;
    }

    color: rgba(255, 255, 255, 0.55);
}

.router-link-active {
    color: #fff;
}
</style>