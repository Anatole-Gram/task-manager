import { defineStore, acceptHMRUpdate } from "pinia";
import { getJson } from "./storeApi/actions";
import { globalReset } from "./storeApi/reset";



export const useProfile = defineStore('profile', {
    // arrow function recommended for full type inference
state: () => ({
    user: {
        id: 0,
        name: undefined,
        surname: undefined,
        position: undefined,
        img: undefined,
        phone: undefined,
        mail: undefined,
        note: undefined
    },
    loggedIn: 0
}),
actions: {
    async getUser(id) {
        return await getJson(`users/user?id=${id}`, {method: "GET"});
    },
    async setUser(user) {
        this.user = user
    },
    async logIn(id) {
        this.loggedIn = id
        localStorage.setItem('userId', id)
        this.setUser(await this.getUser(id))
    },
    async updateProfile(modified, id=localStorage.userId) {

        const options = {
            body : JSON.stringify(modified),
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
        }
        const response = await getJson(`profile/updt-info?id=${id}`, options)
        await this.setUser(response)
    },
    updtImg(path) {
        this.user.img = path
    },
    logOut() {
        globalReset()
        localStorage.removeItem('userId')
    },

}
})

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
// }