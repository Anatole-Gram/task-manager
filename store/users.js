import {defineStore} from "pinia";
import { getJson } from "./storeApi/actions";
import {sliderStates, sliderActions} from "./modules/slider";
import { filterStates, filterActions } from "./modules/filter";


export const useUsers = defineStore('users', {
    state: ()=> ({
        list: [],
        usersCard: {},
        ...filterStates,
        ...sliderStates
    }),
    actions: {
        async getUsers() {
            this.list = await getJson('users', {method: "GET"})
        },
        ...filterActions,
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