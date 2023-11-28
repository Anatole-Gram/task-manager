
import { useFilters } from "../filters";

const filterStates = {
    filteredByUsers: []
}

const filterActions = {
    filterByUsers(set) {
        this.filteredByUsers = this.list.forUser?.filter(item => set.has(item.sender)) || this.list.filter(item => set.has(item.id))
    },
    rmFromListById(id) {
        this.filteredByUsers.splice(this.filteredByUsers.findIndex(el => el.id === id), 1)
    },
    resetFilteredByUsers() { this.filteredByUsers = []; useFilters().$reset()}
}

export {filterStates, filterActions}