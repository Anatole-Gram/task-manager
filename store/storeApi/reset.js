import { useProfile } from "../profile";

export function globalReset() {
    const stores = [useProfile()]
    stores.forEach(el=> {
        el.$reset()
    })
}