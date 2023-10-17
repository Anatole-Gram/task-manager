<template>
        <KeepAlive>
        <TheProfile />
        </KeepAlive>
</template>

<script setup>
import { useProfile } from '@/store/profile';
    const profile = useProfile()
</script>