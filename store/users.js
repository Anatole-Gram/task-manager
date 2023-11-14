import {defineStore} from "pinia";
import { getJson } from "./storeApi/actions";
import {sliderStates, sliderActions} from "./modules/slider";



export const useUsers = defineStore('users', {
    state: ()=> ({
        list: [],
        // filteredList: [],
        // selectedList: [],
        filteredByUsers: [],
        usersCard: {},
        ...sliderStates
    }),
    actions: {
        async getUsers() {
            this.list = await getJson('users', {method: "GET"})
        },
        filterByUsers(set) {
            this.filteredByUsers = this.list.filter(user => set.has(user.id))
         },
         resetFilteredByUsers() {
            this.filteredByUsers = []
         },
        ...sliderActions
    },
    getters: {
        getUsersList: state => state.list ,
        getUserById: state => id => state.list.find(user => user.id === id),
        filteredList() {
            return this.filteredByUsers
        }
    }
})