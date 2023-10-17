import { useProfile } from "@/store/profile"

export const useGuard = () => 
{    addRouteMiddleware('router-guard', (to, from)=> {
    const profile = useProfile()
        if(!profile.loggedIn && (to.name !=='login')) {
            return navigateTo('/login')
        }
    }, {global: true})}