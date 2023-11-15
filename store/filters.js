import { defineStore } from "pinia";

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
            this.selectedIsFull = this.selected.size > this.limitForSelection;
        },
        updSearchByName(condition) {
            this.searchByName = Boolean(condition)
        },
        setLimitForSelection(size) {
            this.limitForSelection = size-1
            this.determinateSelectedIsFull()
        },
    //used by the conditions filter
        setCondition(condition) {
            this.condition = condition
        },
        $reset() {
            this.selected.clear();
            this.limitForSelection = 0;
            this.selectedIsFull = false;
            this.searchByName = false;
            this.condition = null;

        }
    }, 

})