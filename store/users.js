import {defineStore} from "pinia";
import { getJson } from "./storeApi/actions";
import {sliderStates, sliderActions} from "./modules/slider";



export const useUsers = defineStore('users', {
    state: ()=> ({
        list: [],
        filteredList: [],
        usersCard: {},
        ...sliderStates
    }),
    actions: {
        async getUsers() {
            this.list = await getJson('users', {method: "GET"})
        },
        resetFiltredList() {
            this.filteredList = []
        },
        filteredForSelected(set) {
            this.filteredList = this.list.filter(item => set.has(item.id))
         },
        ...sliderActions
    },
    getters: {
        getUsersList: state => state.list ,
        getUserById: state => id => state.list.find(user => user.id === id)
    }
})