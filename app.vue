<template>
    <div class="header">
      <TheHeader />
    </div>
      <NuxtPage />
      <div class="modals-test"></div>
    <div class="footer">
      <TheFooter />
    </div>
</template>

<script setup>
  import { renderToString } from 'vue/server-renderer'
  import {useUsers} from '@/store/users';
  import { useProfile } from './store/profile';
  const users = useUsers()
  const profile =  useProfile()
  

  async function init() {
      const loggedUser = localStorage.getItem('userId')
      if(loggedUser) {
        await profile.logIn(loggedUser)
      }
      useGuard()
      users.getUsers()
  }

    onMounted(()=> {
      init()
    })

    onServerPrefetch(async () => {

      // const ctx = {}
      // console.log(useNuxtApp())
      const app = useNuxtApp()
      const html = await renderToString(app) 
      console.log(ctx.teleports)

    })
</script>

<style  lang="scss" scoped>



</style>
