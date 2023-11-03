import {defineStore} from "pinia";
import { getJson } from "./storeApi/actions";
import {sliderStates, sliderActions} from "./modules/slider";

export const useUsers = defineStore('users', {
    state: ()=> ({
        list: [],
        filteredList: [],
        usersCard: {},
        selected: new Set(),
        ...sliderStates
    }),
    actions: {
        async getUsers() {
            this.list = await getJson('users', {method: "GET"})
        },
        selectUser(id) {
            this.selected.has(id) ? this.selected.delete(id) : this.selected.add(id);
        },
        selectAll() {
            this.list.forEach(user => {this.selected.add(user.id)})
        },
        resetSelected() {
            this.selected.clear()
            this.filteredList = []
        },
        filteredForSelected(set) {
            this.filteredList = this.list.filter(item => set.has(item.id))
         },
        ...sliderActions
    },
    getters: {
        getUsersList() {
            return this.lists
        },
        getUserById() {
            return (id) => this.list.find(user => user.id === id)
        } 
    }
})