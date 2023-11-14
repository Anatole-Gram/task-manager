import { defineStore } from "pinia";
import { useUsers } from "./users";

export const useFilters = defineStore('filters', {
    state: () => ({
        selected: new Set(),
        limitForSelection: 0,
        selectedIsFull: false,
        searchByName: false,
        condition: null,
    }),

    actions: {
    //used by the users filter
        select(id) {
            this.selected.has(id) ? this.selected.delete(id) : this.selected.add(id)
        },
        selectAll(users) {
            users.forEach(user => this.selected.add(user.id))
        },
        resetSelected() {
            this.selected.clear()
        },
        determinateSelectedIsFull() {
            this.selectedIsFull = this.selected.size >= this.limitForSelection;
        },
        updSearchByName(condition) {
            this.searchByName = Boolean(condition)
        },
        setLimitForSelection(size) {
            this.limitForSelection = size
            this.determinateSelectedIsFull()
        },
        $reset(){
            this.selected = new Set()
            this.limitForSelection = 0
            this.selectedIsFull = false
            this.condition = null
            this.searchByName = false
        }
    }
})