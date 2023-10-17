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

  import {useUsers} from '@/store/users';
  import { useProfile } from './store/profile';
  const users = useUsers()
  const profile =  useProfile()
  
//remove
// const {data} =  await useAsyncData('user', () => 
// $fetch(`http://project-lucy.fun/api/users/user?id=1`, {method: "GET"}))
// remove

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
</script>

<style  lang="scss" scoped>



</style>
