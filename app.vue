<template>
    <div class="header">
      <TheHeader />
    </div>
      <NuxtPage />
    <div class="footer">
      <TheFooter />
    </div>
</template>

<script setup>
  // import { renderToString } from 'vue/server-renderer'
  import {useUsers} from '@/store/users';
  import { useProfile } from './store/profile';
  const users = useUsers()
  const profile =  useProfile()
  
    onMounted(async ()=> {
      localStorage.getItem('userId') && await profile.logIn(localStorage.getItem('userId'))
      users.getUsers()
    })

    onServerPrefetch(async () => {

      // const ctx = {}
      // console.log(useNuxtApp())
      // const app = useNuxtApp()
      // const html = await renderToString(app) 
      // console.log(ctx.teleports)

    })
</script>

<style  lang="scss" scoped>



</style>
