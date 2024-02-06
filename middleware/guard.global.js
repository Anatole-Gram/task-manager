import { useProfile } from "@/store/profile"

export default defineNuxtRouteMiddleware(async (to, from)=> {
    if (process.client && !useNuxtApp().isHydrating) {
        if(!useProfile().loggedIn && (to.path !=='/login')) {
            return navigateTo('/login')
            }
        }
    })